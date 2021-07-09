import React, { useRef, useState, useEffect, useCallback } from 'react'
import io from 'socket.io-client';
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom";
import axios from "axios";
import { IconButton } from '@material-ui/core';
import { InsertEmoticon } from '@material-ui/icons';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Redirect } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import './teamschat.css';
import { APIBaseURL } from '../../../constants';



const TeamsChat = (props) => {
    const { auth } = props;

    //get query parameter
    const search = useLocation().search;
    const params = new URLSearchParams(search);
    const teamid = params.get("teamid")


    const [input, setInput] = useState("");
    const [show, setShow] = useState(false);
    const [showchat, setShowchat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [teammessages, setTeamMessages] = useState([]);


    const socketRef = useRef();
    const inputRef = useRef(null)

    //socket connection
    useEffect(() => {
        socketRef.current = io.connect(APIBaseURL)
        console.log(socketRef.current)
        socketRef.current.emit("chatroom", { roomID: teamid, token: localStorage.getItem('idToken') })

        socketRef.current.on("receive-message", (payload) => {
            console.log("read..")
            console.log(payload)
            addToChat(payload)
        })
    }, [])

    //handle new team messages
    const sendMessage = useCallback((e) => {
        e.preventDefault()
        console.log("send")
        if (inputRef.current && inputRef.current?.value !== "") {
            const val = inputRef.current?.value
            console.log(val)
            socketRef.current.emit("team message", { message: val, teamid: teamid })
            const chatObj = {
                sender: auth.displayName,
                message: val,
                id: 'me',
                date: new Date()
            }
            addToChat(chatObj)
            inputRef.current.value = ""
            setInput("")
        }
    }, [])
    const addToChat = useCallback((chatObj) => {
        console.log(chatObj)
        console.log("add")
        setMessages(chats => [...chats, chatObj])
    }, [])

    //fetch meetings chat
    useEffect(() => {
        const fetchTeam = async () => {

            const response = await axios.get(`${APIBaseURL}/team/details`, {
                headers: { 'team_id': teamid }
            })
            const team = response.data.team;
            console.log(team)
            const messages = team.messages
            setMessages(messages)


        };

        fetchTeam().catch((error) => {
            console.log(error.message)

        });

    }, []);

   //proctected route
    if (!auth.uid && auth.isLoaded) {
        return <Redirect to="/login" />
    }

    return (

        <div className="teamchat">

            <ScrollToBottom className="teamchat__body">
                {messages.map(message => (

                    <p className={`teamchat__message ${message.sender === auth.displayName && "teamchat__receiver"}`}>
                        <span className="teamchat__name">{message.sender}</span>
                        <br></br>
                        {message.message}
                        <span className="teamchat__timestamp">{new Date(message.date).toLocaleTimeString()}</span>
                    </p>

                ))}
            </ScrollToBottom>
            {show ? <Picker set="apple" emojiSize={34} showPreview={false} color={"#009688"} onSelect={emoji => setInput(input + emoji.native)} style={{ width: '100%' }} /> : null}
            <div className="teamchat__footer">
                <IconButton>
                    <InsertEmoticon onClick={() => setShow(!show)} />
                </IconButton>
                <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                <IconButton>
                    <SendIcon onClick={(e) => sendMessage(e)} />
                </IconButton>
            </div>
        </div>

    )

}

const mapStateToProps = ({ auth, firebase }) => {
    return {
        auth: firebase.auth,
        authError: auth.authError
    }
}
export default connect(mapStateToProps)(TeamsChat)

