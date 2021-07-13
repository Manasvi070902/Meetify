import React, { useState, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import IconButton from '@material-ui/core/IconButton';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallEndIcon from '@material-ui/icons/CallEnd';
import Participants from '../../Components/Participants'
import MessageBox from '../MessageBox';
import ImageIcon from '@material-ui/icons/Image';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MeetNotes from '../MeetNotes';
import Board from '../../Components/Board'
import copy from "copy-to-clipboard";
import { withStyles } from '@material-ui/core/styles';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import sharepic from "../../Assets/share.svg"
import { makeStyles } from '@material-ui/core';
import "./videocallbar.css"

const IconButtonStyle = {
  color: "#fff",
  margin: "5px",
  width: "50px",
  height: "50px",
}
const useStyles = makeStyles({
  dialog: {
    position: 'absolute',
    left: 10,
    top: 50
  }
});
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);



export const VideoCallBar = (props) => {

  const roomid = props.roomID
  const classes = useStyles();

  const exit = props.exit;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [modalopen, setModalOpen] = useState(false);



  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [pageURL, setPageURL] = useState(0);
  useEffect(() => {
    setPageURL(window.location.href);
  })

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const shareHandler = () => {

    copy(pageURL);
  }
  const copycodeHandler = () => {

    copy(roomid);
  }
  return (

    <div className="btn-down" >
     

      <IconButton style={{ ...IconButtonStyle, backgroundColor: "#323232" }} onClick={handleModalOpen}> <InfoOutlinedIcon /></IconButton>
      <IconButton style={{ ...IconButtonStyle, backgroundColor: "#323232" }} aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}><ImageIcon /> </IconButton>
      {(props.video === true) ?
        <IconButton style={{ ...IconButtonStyle, backgroundColor: "#323232" }} onClick={props.videoHandler}> <VideocamIcon /></IconButton>
        : <IconButton style={{ ...IconButtonStyle, backgroundColor: "#da3c3f" }} onClick={props.videoHandler}> <VideocamOffIcon /></IconButton>}
      {props.audio === true ?
        <IconButton style={{ ...IconButtonStyle, backgroundColor: "#323232" }} onClick={props.audioHandler}> <MicIcon /></IconButton>
        : <IconButton style={{ ...IconButtonStyle, backgroundColor: "#da3c3f" }} onClick={props.audioHandler}> <MicOffIcon /> </IconButton>}

      <IconButton style={{ ...IconButtonStyle, backgroundColor: "#da3c3f" }} onClick={exit} ><CallEndIcon /></IconButton>

      <Menu id="fade-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} TransitionComponent={Fade}>
        <MenuItem onClick={props.bg2Handler}>Birthday Theme</MenuItem>
        <MenuItem onClick={props.bg1Handler}>Festival Theme</MenuItem>
        <MenuItem onClick={props.bgHandler}>Default</MenuItem>
      </Menu>
      <Participants peers={props.peers} />
      <MessageBox chats={props.chats} socketId={props.socketId} inputRef={props.inputRef} sendMessage={props.sendMessage} />
      <MeetNotes roomID={props.roomID} team={props.team} />
      <Board />

      {/* info dialog */}
      <Dialog onClose={handleModalClose} aria-labelledby="customized-dialog-title" open={modalopen} fullWidth="sm" maxWidth="sm" classes={{
        paper: classes.dialog
      }}>
        <DialogTitle id="customized-dialog-title" onClose={handleModalClose}>
          Meeting Details
        </DialogTitle>
        <DialogContent dividers>
          <div className="col-lg-12  d-flex col-12 align-items-center justify-content-center">
            <img className="img-fluid mx-auto d-block rounded w-50 " src={sharepic} alt="pic" />
            <div className="row">
              <h6 >Share the Meeting Link <br /> <br />{pageURL}
                <IconButton onClick={shareHandler}> < FileCopyOutlinedIcon /> </IconButton></h6> <hr />
            </div>
          </div>
        </DialogContent>

      </Dialog>
    </div>



  )
}

export default VideoCallBar;
