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
    const [audio, setAudio] = useState(props.audio)
    const [video, setVideo] = useState(props.video)
     const theme = useTheme();
    

   const exit = props.exit;
    
    // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const audioHandler = () => {
        console.log('audio')
        setAudio(!audio)
    }

    const videoHandler = () => {
        console.log(video)
        setVideo(!video)
    }
  
	
    return (
       
        <div className="btn-down" >
        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}} onClick={videoHandler}>{(video === true) ? <VideocamIcon /> : <VideocamOffIcon />} </IconButton>

        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}} onClick={audioHandler}>{audio === true ? <MicIcon /> : <MicOffIcon />} </IconButton>

        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#da3c3f"}} onClick={exit} ><CallEndIcon /></IconButton>


        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}}><ImageIcon /> </IconButton>
        <Participants peers={props.peers} /> 

        {/* <Badge badgeContent={this.state.newmessages} max={999} color="secondary" onClick={this.openChat}>
            <IconButton style={{ color: "#ffffff", backgroundColor: "#323232", margin: "5px", width:"50px", height:"50px"  }} >
                <ChatIcon />
            </IconButton>
        </Badge> */}

        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#5a6bda"}} onClick={imageCapture}> < CameraAltRoundedIcon/> </IconButton>
      
      <MessageBox chats={props.chats} socketId={props.socketId} inputRef={props.inputRef} sendMessage={props.sendMessage}/>
      <Board />
    </div>


    )
}

export default VideoCallBar;
