import React,{useRef, useState, useCallback, useEffect} from 'react'
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

import Board from '../../Components/Board'
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
	
    return (
       
        <div className="btn-down" >
        {(props.video === true) ?
        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}} onClick={props.videoHandler}> <VideocamIcon /></IconButton>
         :<IconButton style={{ ...IconButtonStyle,backgroundColor: "#da3c3f"}} onClick={props.videoHandler}> <VideocamOffIcon /></IconButton>} 
        {props.audio === true ?
        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}} onClick={props.audioHandler}> <MicIcon /></IconButton>
        :  <IconButton style={{ ...IconButtonStyle,backgroundColor: "#da3c3f"}} onClick={props.audioHandler}> <MicOffIcon /> </IconButton>}

         {/* {props.screenshare === true ?
        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}} onClick={props.screenShareHandler}> <ScreenShareIcon/></IconButton>
        :  <IconButton style={{ ...IconButtonStyle,backgroundColor: "#da3c3f"}} onClick={props.screenShareHandler}> <StopScreenShareIcon /> </IconButton>} */}

        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#da3c3f"}} onClick={exit} ><CallEndIcon /></IconButton>

        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}}><ImageIcon /> </IconButton>
        <Participants peers={props.peers} /> 

        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#5a6bda"}} onClick={imageCapture}> < CameraAltRoundedIcon/> </IconButton>
      
      <MessageBox chats={props.chats} socketId={props.socketId} inputRef={props.inputRef} sendMessage={props.sendMessage}/>
      <Board />
    </div>


    )
}

export default VideoCallBar;
