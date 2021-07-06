import React,{useRef,useState, useEffect,useCallback} from 'react'
import io from 'socket.io-client';
import { connect } from 'react-redux'
import {useLocation} from "react-router-dom";
import { Avatar, Button,IconButton } from '@material-ui/core';
import { InsertEmoticon} from '@material-ui/icons';
import axios from "axios";
import './chatsection.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const useStyles = makeStyles((theme) => ({
    rounded: {
      color: '#fff',
      backgroundColor: '#14a2b8',
      
    },
  }));

const ChatSection = (props) => {
  const {auth} = props;
  const classes = useStyles();
  //get query parameter
 const search = useLocation().search;
 const params = new URLSearchParams(search);
 
 const meetid = params.get("meetid")


 const [input, setInput] = useState("");
 const [show, setShow] = useState(false);
 const [showchat, setShowchat] = useState(false);
 const [messages, setMessages] = useState([]);
 const [meets, setMeets] = useState([]);
 const [name, setName] = useState('');

 const socketRef = useRef();
 const inputRef = useRef(null)


 useEffect(() => {
    socketRef.current = io.connect("http://localhost:5000")
    console.log(socketRef.current)
    socketRef.current.emit("chatroom", {roomID: meetid, token: localStorage.getItem('idToken') })

    socketRef.current.on("receive-message", (payload) => {
        console.log("read..")
        console.log(payload)
           addToChat(payload)
        })
}, [])


const sendMessage = useCallback((e) => {
    e.preventDefault()
    console.log("send")
    if(inputRef.current && inputRef.current?.value !== ""){
        const val = inputRef.current?.value
        console.log(val)
        socketRef.current.emit("message",  val)
        const chatObj = {
            sender: auth.displayName,
            message: val,
            id:'me',
            date : new Date()
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
  

 useEffect(() => {
    const fetchMeets = async () => {
        var meets = []
      const response = await axios.get(`http://localhost:5000/meets/`,{
        headers: {'auth_id' : auth.uid}
      })
      const meet = response.data.meets;

      
     setMeets(meet)
     meet.map(item => {
         if(item._id === meetid){
            
             setMessages(item.messages)
             setName(item.name)
         } 
     })
    
    };

    fetchMeets().catch((error) => {
   console.log(error.message)
    
    });
   
  }, [meetid]);
  
    const joinHandler = () => {
        window.open(`/room?room=${meetid}`)
    }
  if(!auth.uid && auth.isLoaded){
    return <Redirect to="/login" />
  }

 return (

         <div className="chat">
         <div className="chat__header col-10 col-lg-12">
         <Avatar variant="rounded" className={classes.rounded} style={{minHeight:"30px",minWidth:"30px"}}>{name.charAt(0)}</Avatar>
             <div className="chat__headerInfo">
                 <h4>{name}</h4>
                 <p>Last seen {messages.length-1 > 0 ? (new Date(messages[messages.length-1].date).toString()) : ("No messages yet.")}</p>
             </div>

             <div className="chat__headerRight">
             <Button onClick={joinHandler} variant="contained" color="secondary">Join</Button>
             </div>
         </div>
         <ScrollToBottom className="chat__body">
             {messages.map(message => (
                 
               
                 <p className={`chat__message ${message.sender === auth.displayName && "chat__receiver"}`}>
                     <span className="chat__name">{message.sender}</span>
                     <br></br>
                     {message.message}
                     <span className="chat__timestamp">{new Date(message.date).toLocaleTimeString()}</span>
                 </p>
               
             ))}
         </ScrollToBottom>
         {show ? <Picker set="apple" emojiSize={34} showPreview={false} color={"#009688"} onSelect={emoji => setInput(input + emoji.native)} style={{ width: '100%' }}/> : null}
         <div className="chat__footer">
             <IconButton>
                 <InsertEmoticon onClick={() => setShow(!show)}/>
             </IconButton>
                 <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}  placeholder="Type a message" type="text"/>
             <IconButton>
                 <SendIcon  onClick={(e) => sendMessage(e)} />
             </IconButton>
         </div>
     </div>
    
 )
    
}

const mapStateToProps = ({auth, firebase}) => {
    return {
      auth: firebase.auth,
      authError: auth.authError
    }
  }
  export default connect(mapStateToProps)(ChatSection)
  
  