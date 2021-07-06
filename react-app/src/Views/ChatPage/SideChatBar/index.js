import React from 'react';
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import './sidechatbar.css';

function SideChat({ id, name }) {

console.log(id)
    return  (
        <Link to={`/chat/?meetid=${id}`}>
            <div className="sidebarChat">
            <Avatar style={{backgroundColor: "#dfe4e6"}}>{name.charAt()}</Avatar>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
               
            </div>            
        </div>
        </Link>
    )
   
}

export default SideChat