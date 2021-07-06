import React, { useEffect, useState } from 'react'
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from '@material-ui/icons';
import SideChat from '../SideChatBar';
import { connect } from 'react-redux'
import axios from "axios";
import './sidebar.css'


const Sidebar = (props) => {
    const {auth} = props;
 
  

 const [input, setInput] = useState("");
 const [show, setShow] = useState(false);
 const [messages, setMessages] = useState([]);
 const [meets, setMeets] = useState([]);

 
 useEffect(() => {
    const fetchMeets = async () => {
        var meets = []
      const response = await axios.get(`http://localhost:5000/meets/`,{
        headers: {'auth_id' : auth.uid}
      })
      const meet = response.data.meets;

      setMeets(meet)
  
    
    };

    fetchMeets().catch((error) => {
   console.log(error.message)
    
    });
   
  }, []);

    // useEffect(() => {
    //     axios.get('/rooms/sync').then(response => {
    //         //console.log(response.data);
    //         setRooms(response.data);
    //     });
    // }, []);

    // useEffect(() => {
    // var pusher = new Pusher('ab8ff6a25757b8dcc9ca', {
    //     cluster: 'mt1'
    //   });
      
    //   var channel = pusher.subscribe('rooms');
    //   channel.bind('inserted', function(newRoom) {
    //     setRooms([...rooms, newRoom]);
    //   });

    // return () => {
    //     channel.unbind_all();
    //     channel.unsubscribe();
    // };
    // }, [rooms])

    //console.log(rooms);
    
    return (
        // <div className="sidebar" id="sidebar">
        //     {show ? 
        //     (<User onClose={() => setShow(false)}>
        //         <div className="user__img">
        //             <img src={user.photoURL} alt={user.displayName}/>
        //         </div>
        //         <div className="user__name">
        //             <p>Your Name</p>
        //             <h4>{user.displayName}</h4>
        //         </div>
        //         <div className="user__name__info">
        //             <p>This name will be visible to your WhatsApp web clone contacts.</p>
        //         </div>
        //     </User>)
        //     :(
            <div>
                <div className="sidebar__header">
                    {/* <Avatar title="Profile"  onClick={() => setShow(true)}/> */}
                    <div className="sidebar__headerRight">
                        <IconButton title="New Room">
                           
                        </IconButton>
                        
                    </div>
                </div>
                {/* <div className="sidebar__search">
                    <div className="sidebar__searchContainer">
                        <SearchOutlined/>
                        <input placeholder="Search or start new chat" type="text" size="45" />
                    </div>
                </div> */}
               
                   
                    {meets && meets.map(meet => {
                        console.log(meet)
                  
                 
                return (
                    <div className="sidebar__chats">
                    <SideChat key={meet._id} id={meet._id} name={meet.name}/>
                    </div>
                  
                     ) })}
                
               
            
         </div>
    )
}

const mapStateToProps = ({auth, firebase}) => {
    return {
      auth: firebase.auth,
      authError: auth.authError
    }
  }
  export default connect(mapStateToProps)(Sidebar)
  
  