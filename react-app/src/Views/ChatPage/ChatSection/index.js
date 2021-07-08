import React,{useRef,useState, useEffect,useCallback} from 'react'
import io from 'socket.io-client';
import axios from "axios";
import { connect } from 'react-redux'
import {useLocation} from "react-router-dom";
import { Avatar, Button,IconButton } from '@material-ui/core';
import { InsertEmoticon} from '@material-ui/icons';
import ScrollToBottom from 'react-scroll-to-bottom';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import GroupIcon from '@material-ui/icons/Group';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import chatpic from "../../../Assets/chat.svg"
import './chatsection.css';

const useStyles = makeStyles((theme) => ({
    rounded: {
      color: '#fff',
      backgroundColor: '#14a2b8',
      
    },
    green: {
        color: "#ffffff",
        backgroundColor: "#35a9aa",
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
 const [messages, setMessages] = useState([]);
 const [meets, setMeets] = useState([]);
 const [name, setName] = useState('');
 const [members, setMembers] = useState([]);
 const [memberopen, setMemberOpen] = useState(false);

 const handleMemberClickOpen = () => {
  setMemberOpen(true);
};

const handleMemberClose = () => {
  setMemberOpen(false);
};

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
            setMembers(item.members)
             setMessages(item.messages)
             setName(item.name)

         } 
        
     })
    
    };

    fetchMeets().catch((error) => {
   console.log(error.message)
    
    });
   
  }, [meetid]);
  
 
  if(!auth.uid && auth.isLoaded){
    return <Redirect to="/login" />
  }

 return (

    <>
    {meets.length > 0 && 
         <div className="chat">
        
         {name !== "" &&
         <>
         <div className="chat__header col-10 col-lg-12 m-4">
         <Avatar variant="rounded" className={classes.rounded} style={{minHeight:"30px",minWidth:"30px"}}>{name.charAt(0)}</Avatar>
             <div className="chat__headerInfo">
                 <h4>{name}</h4>
                 <p>Last seen {messages.length-1 > 0 ? (new Date(messages[messages.length-1].date).toString()) : ("No messages yet.")}</p>
             </div>

             <div className="chat__headerRight">
             <IconButton onClick={handleMemberClickOpen} ><GroupIcon /></IconButton>
             <Dialog open={memberopen} onClose={handleMemberClose} aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle onClose={handleMemberClose} id="responsive-dialog-title">Attendees</DialogTitle>
        <DialogContent>
        
         <List>
              {members.length > 0 && members.map(member => (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.green}>{member.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={member.name}
                  />
                </ListItem>
             ))}
            
            </List>
            </DialogContent>
        <DialogActions>
          <Button  style= {{color : "#fff"}} onClick={handleMemberClose}  >Close</Button>
        </DialogActions>
        
      </Dialog>

       
             </div>
         </div>

        

         <ScrollToBottom className="chat__body">
             {messages.length >0 && messages.map(message => (
                 
               
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
         </>
    }
    {name === "" && 
    <>
    <div className="col-lg-10 col-12 align-items-center justify-content-center">
      <img className="img-fluid rounded" src={chatpic} alt="pic"/>
      <h3 className="col-12 d-flex justify-content-center">Choose a Meet</h3>
      <h6 className="d-flex justify-content-center">Have group conversations after the meet!</h6>
      </div>
    </>}
         </div>
}
{meets.length === 0 && 
<>
<div className="col-lg-9 col-12 align-items-center justify-content-center">
      <img className="img-fluid rounded" src={chatpic} alt="pic"/>
      <h3 className="col-12 d-flex justify-content-center">Start a Meet Chat</h3>
      <h6 className="d-flex justify-content-center">Create a meet and have group conversations after the meet!</h6>
      </div>

</>}
  
      </>
   
 )
    
}

const mapStateToProps = ({auth, firebase}) => {
    return {
      auth: firebase.auth,
      authError: auth.authError
    }
  }
  export default connect(mapStateToProps)(ChatSection)
  
  