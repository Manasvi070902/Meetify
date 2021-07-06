import React,{useRef,useState, useEffect,useCallback} from 'react'
import io from 'socket.io-client';
import { connect } from 'react-redux'
import {useLocation} from "react-router-dom";
import { Avatar, Button,IconButton } from '@material-ui/core';
import { AttachFile, SearchOutlined, MoreVert, InsertEmoticon, MicOutlined} from '@material-ui/icons';
import axios from "axios";
// import div from 'react-scroll-to-bottom';
import './chatsection.css';
import { makeStyles } from '@material-ui/core/styles';

  
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
 const [messages, setMessages] = useState([]);
 const [meets, setMeets] = useState([]);
 const [name, setName] = useState('');

 const socketRef = useRef();
 const inputRef = useRef(null)
 const [chats, setChats] = useState([])

//  const init = useCallback(async() => {
//     socketRef.current = io.connect("http://localhost:5000")
//     console.log(meetid)
//     socketRef.current.emit("join room", {roomID: meetid, token: localStorage.getItem('idToken') })
// })  
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
    }
}, [])
const addToChat = useCallback((chatObj) => {
    console.log(chatObj)
    console.log("add")
    setMessages(chats => [...chats, chatObj])
}, [])
  

//  const sendMessage = async(e) => {
//      e.preventDefault();

//      if(input !== ''){
//         //  await axios.post('/messages/new', {
//         //      message: input,
//         //      name: user.displayName,
//         //      timestamp: new Date(),
//         //      roomid: roomId
//         //  });
 
//         //  setInput('');
//         //  if(show){
//         //      setShow(!show);
//         //  }
//      }
//  };

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
   
  }, []);
  


 return (
     <div className="chat">
         <div className="chat__header">
         <Avatar variant="rounded" className={classes.rounded} style={{minHeight:"30px",minWidth:"30px"}}>{name.charAt(0)}</Avatar>
             <div className="chat__headerInfo">
                 <h3>{name}</h3>
                 <p>Last seen {messages.length-1 > 0 ? (new Date(messages[messages.length-1].date).toString()) : ("No messages yet.")}</p>
             </div>

             <div className="chat__headerRight">
             <Button variant="contained" color="secondary">Join</Button>
             </div>
         </div>
         <div className="chat__body">
{/* {console.log(meets)} */}
    
             {messages.map(message => (
                 <>
               
                 <p className={`chat__message ${message.sender === auth.displayName && "chat__receiver"}`}>
                     <span className="chat__name">{message.sender}</span>
                     <br></br>
                     {message.message}
                     <span className="chat__timestamp">{new Date(message.date).toLocaleTimeString()}</span>
                 </p>
                 </>
             ))}
         </div>
         {/* {show ? <Picker set="apple" emojiSize={34} showPreview={false} color={"#009688"} onSelect={emoji => setInput(input + emoji.native)} style={{ width: '100%' }}/> : null} */}
         <div className="chat__footer">
             <IconButton>
                 <InsertEmoticon onClick={() => setShow(!show)}/>
             </IconButton>
             <IconButton title="Attach">
                 <AttachFile/>
             </IconButton>
             {/* <form> */}
                 <input ref={inputRef}  placeholder="Type a message" type="text"/>
                 <button onClick={(e) => sendMessage(e)} type="submit"> Send a message</button>
             {/* </form> */}
             <IconButton>
                 <MicOutlined/>
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
  
  