import React from 'react';
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import './sidechatbar.css';

const useStyles = makeStyles((theme) => ({
    rounded: {
      color: '#fff',
      backgroundColor: '#14a2b8',
      
    },
  }));
const  SideChat = ({ id, name }) => {
    const classes = useStyles();
console.log(id)
    return  (
        <Link  to={`/chat/?meetid=${id}`}>
            <div className="sidebarChat">
            <Avatar variant="rounded" className={classes.rounded} style={{minHeight:"30px",minWidth:"30px"}}>{name.charAt()}</Avatar>
            <div className="sidebarChat__info m-2 justify-content-center">
                <h2>{name}</h2>
            </div>            
        </div>
        </Link>
    )
   
}

export default SideChat