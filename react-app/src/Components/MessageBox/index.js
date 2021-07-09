import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ChatIcon from '@material-ui/icons/Chat';
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import Message from '../Message';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import groupchatpic from "../../Assets/groupchat.svg"


function PaperComponent(props) {
  return (
    <Draggable handle="#chat-form" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
const IconButtonStyle = {
  color: "#fff",
  margin: "5px",
  width: "50px",
  height: "50px",
}

const MessageBox = (props) => {
  const chats = props.chats
  const [open, setOpen] = useState(false);
  const inputRef = props.inputRef

  //handle message dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <IconButton onClick={handleClickOpen} style={{ ...IconButtonStyle, backgroundColor: "#1590a2" }} > <ChatIcon /> </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="chat-form" PaperComponent={PaperComponent}>
        <DialogTitle onClose={handleClose} id="chat-form">Group Chat  </DialogTitle>
        <DialogContent>
          {chats.length === 0 &&
            <div className="col-lg-12  col-12 align-items-center justify-content-center">
              <img className="img-fluid mx-auto d-block rounded " src={groupchatpic} alt="pic" />
              <h6 className="d-flex justify-content-center">Start Group Chat!</h6>
            </div>}
          {chats.length > 0 && chats.map((chat, index) => (
            <Message key={index} chat={chat} socketID={props.socketID} />
          ))}
        </DialogContent>
        <DialogActions>
          <input placeholder="Type here..." ref={inputRef} style={{
            flex: 1,
            borderRadius: "21px",
            padding: "12px",
            outlineWidth: 0
          }} />
          <IconButton style={{ color: "#ffffff", backgroundColor: "#35a9aa", margin: "0 10px 0 10px" }} onClick={(e) => props.sendMessage(e)} >
            <ArrowForwardIos />
          </IconButton>

        </DialogActions>

      </Dialog>
    </>
  )
}
const mapStateToProps = ({ auth, firebase }) => {
  return {
    auth: firebase.auth,
    authError: auth.authError
  }
}
export default connect(mapStateToProps)(MessageBox)
