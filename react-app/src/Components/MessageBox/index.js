import React ,{ useRef, useState, useCallback, useEffect}from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/Chat';
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import Message from '../Message';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import { Input, Button } from '@material-ui/core';
const IconButtonStyle = {
    color: "#fff",
     margin: "5px",
     width:"50px",
     height:"50px",
    }

const MessageBox = (props) => {
    const chats = props.chats
    const [open, setOpen] = useState(false);
    const inputRef = props.inputRef
    const theme = useTheme();
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
   

    return (
        <>
        <IconButton onClick={handleClickOpen} style={{ ...IconButtonStyle,backgroundColor: "#5a6bda"}} > <ChatIcon/> </IconButton>
        <Dialog open={open} onClose={handleClose}aria-labelledby="responsive-dialog-title">
        <DialogTitle onClose={handleClose} id="responsive-dialog-title">Group Chat  </DialogTitle>
        <DialogContent>
        {chats.map((chat, index) => (
                    <Message key={index} chat={chat} socketID={props.socketID} />
                ))}
        </DialogContent>
        <DialogActions>
        <input  placeholder="Type here..." ref={inputRef}  />
						<IconButton style={{ color: "#ffffff", backgroundColor: "#5867dd", margin: "0 10px 0 10px"}}  onClick={(e) => props.sendMessage(e)} >
					<ArrowForwardIos />
					</IconButton>
       
        </DialogActions>
     
      </Dialog>
      </>
    )
}
const mapStateToProps = ({auth, firebase}) => {
    return {
      auth: firebase.auth,
      authError: auth.authError
    }
  }
  export default connect(mapStateToProps)(MessageBox)
