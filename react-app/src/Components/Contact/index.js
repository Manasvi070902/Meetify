import React, { useState, useEffect} from 'react'
 import {db} from "../../Utils/firebase.js"
import { makeStyles , withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import green from '@material-ui/core/colors/green';

const StyledBadge = withStyles((theme) => ({
  badge: {
    // backgroundColor: '#44b700',
    // color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);
const useStyles = makeStyles((theme) => ({
  list: {
    width: '90%',
    maxWidth: '36ch',
    backgroundColor: '#333333',
    margin : '10px',
    
  },

  inline: {
    display: 'inline',
  },
}));

const Contacts = (props) => {
const classes = useStyles();
//main friend request and make a contact list
const [contactList, setContactList] = useState({})
const [contactRequestsSent, setContactRequestsSent] = useState([])
const [contactRequestsReceived, setContactRequestsReceived] = useState([])
const Green = green[400]; 
//store total contacts
const [userList, setUserList] = useState([])



const fetchUsers = async() => {
  const resp = db.collection('users');
  await resp.get().then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      console.log(data);
      setUserList(data);
    });

}
 useEffect(() => {    
  fetchUsers();
}, [])
    return (

       <>
        
        
        
    <List className={classes.list}>
    <h4 >Contacts</h4>
    {console.log(userList)}
    {userList && userList.map(item => {
      return(
      <>
      {console.log(item.isActive)}
      
      <ListItem alignItems="flex-end">
        <ListItemAvatar>
        {item.isActive ?
        <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
        color="primary">
          <Avatar alt={item.name} src={item.picture} />
           </StyledBadge> :
          <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
        color="secondary">
          <Avatar alt={item.name} src={item.picture} />
           </StyledBadge> 
           }

        </ListItemAvatar>
     {item.isActive ? <ListItemText primary={item.name} secondary="Online"/> : <ListItemText primary={item.name} secondary="Offline"/>}


      </ListItem>
      <Divider variant="inset" component="li" />
      </>
      )
      })}

      </List>
      </>
        
    )
}

export default Contacts
