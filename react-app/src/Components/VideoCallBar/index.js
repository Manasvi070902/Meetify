import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare';
import CallEndIcon from '@material-ui/icons/CallEnd';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import { imageCapture } from '../../Actions/imagecapture';
import { useTheme } from '@material-ui/core/styles';
import Participants from '../../Components/Participants'
import MessageBox from '../MessageBox';
import ImageIcon from '@material-ui/icons/Image';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Fade from '@material-ui/core/Fade';
import MeetNotes from '../MeetNotes';
import Board from '../../Components/Board'
import copy from "copy-to-clipboard"; 
import  "./videocallbar.css"

const IconButtonStyle = {
color: "#fff",
 margin: "5px",
 width:"50px",
 height:"50px",
}


export const VideoCallBar = (props) => {
   
    const theme = useTheme();   
 

   const exit = props.exit;  
	 const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const shareHandler = () => {
      
     copy(props.roomID);
  }
    return (
       
        <div className="btn-down" >
        {(props.video === true) ?
        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}} onClick={props.videoHandler}> <VideocamIcon /></IconButton>
         :<IconButton style={{ ...IconButtonStyle,backgroundColor: "#da3c3f"}} onClick={props.videoHandler}> <VideocamOffIcon /></IconButton>} 
        {props.audio === true ?
        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}} onClick={props.audioHandler}> <MicIcon /></IconButton>
        :  <IconButton style={{ ...IconButtonStyle,backgroundColor: "#da3c3f"}} onClick={props.audioHandler}> <MicOffIcon /> </IconButton>}
<IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}} onClick={shareHandler}> <GroupAddIcon /></IconButton>
         {/* {props.screenshare === true ?
        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}} onClick={props.screenShareHandler}> <ScreenShareIcon/></IconButton>
        :  <IconButton style={{ ...IconButtonStyle,backgroundColor: "#da3c3f"}} onClick={props.screenShareHandler}> <StopScreenShareIcon /> </IconButton>} */}
<IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}} aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}><ImageIcon /> </IconButton>
        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#da3c3f"}} onClick={exit} ><CallEndIcon /></IconButton>

        
        <Menu id="fade-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose} TransitionComponent={Fade}>
  <MenuItem onClick={props.bg2Handler}>Birthday Theme</MenuItem>
  <MenuItem onClick={props.bg1Handler}>Office Theme</MenuItem>
  <MenuItem onClick={props.bgHandler}>Default</MenuItem>
</Menu>

        <Participants peers={props.peers} /> 

        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#1590a2"}} onClick={imageCapture}> < CameraAltRoundedIcon/> </IconButton>
      
      <MessageBox chats={props.chats} socketId={props.socketId} inputRef={props.inputRef} sendMessage={props.sendMessage}/>
     <MeetNotes roomID={props.roomID}/>
      <Board />
    </div>


    )
}

export default VideoCallBar;
