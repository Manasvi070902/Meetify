import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare';
import CallEndIcon from '@material-ui/icons/CallEnd';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import  "./videocallbar.css"

import { imageCapture } from '../../Actions/imagecapture';


const IconButtonStyle = {
color: "#fff",
 margin: "5px",
 width:"50px",
 height:"50px",
}



export const VideoCallBar = () => {
  
   
	
    return (
       
        <div className="btn-down" >
        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}}><VideocamIcon /> </IconButton>

        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}}><MicIcon /> </IconButton>

        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#da3c3f"}}><CallEndIcon /></IconButton>


        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}}><ScreenShareIcon /> </IconButton>
       

        {/* <Badge badgeContent={this.state.newmessages} max={999} color="secondary" onClick={this.openChat}>
            <IconButton style={{ color: "#ffffff", backgroundColor: "#323232", margin: "5px", width:"50px", height:"50px"  }} >
                <ChatIcon />
            </IconButton>
        </Badge> */}
        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#5a6bda"}} > <DescriptionOutlinedIcon /> </IconButton>
        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#5a6bda"}} onClick={imageCapture}> < CameraAltRoundedIcon/> </IconButton>
        
    </div>


    )
}

export default VideoCallBar;