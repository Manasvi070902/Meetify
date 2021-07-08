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
    
    return (
            <>
                {meets.length>0 && meets.map(meet => {
                        console.log(meet)     
                return (
                  <> 
                <div className="sidebar__header mt-4">
                    <div className="sidebar__headerRight">
                    <h4>Meetings</h4>
                    </div>
                </div>    

                
                    <div className="sidebar__chats">
                    <SideChat key={meet._id} id={meet._id} name={meet.name}/>
                    </div>
                  </>
                     ) })}
                     
                
               
            
         </>
    )
}

const mapStateToProps = ({auth, firebase}) => {
    return {
      auth: firebase.auth,
      authError: auth.authError
    }
  }
  export default connect(mapStateToProps)(Sidebar)
  
  