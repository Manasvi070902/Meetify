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
import PeopleIcon from '@material-ui/icons/People';
import { imageCapture } from '../../Actions/imagecapture';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Participants from '../../Components/Participants'
import MessageBox from '../MessageBox';
import ImageIcon from '@material-ui/icons/Image';
import BrushIcon from '@material-ui/icons/Brush';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Board from '../../Components/Board'
import  "./videocallbar.css"

const IconButtonStyle = {
color: "#fff",
 margin: "5px",
 width:"50px",
 height:"50px",
}
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export const VideoCallBar = (props) => {
    const [audio, setAudio] = useState(props.audio)
    const [video, setVideo] = useState(props.video)
    const [open, setOpen] = useState(false);
     const theme = useTheme();
     const classes = useStyles();

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
    const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
	
    return (
       
        <div className="btn-down" >
        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}} onClick={videoHandler}>{(video === true) ? <VideocamIcon /> : <VideocamOffIcon />} </IconButton>

        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}} onClick={audioHandler}>{audio === true ? <MicIcon /> : <MicOffIcon />} </IconButton>

        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#da3c3f"}} onClick={exit} ><CallEndIcon /></IconButton>


        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#323232"}}><ImageIcon /> </IconButton>
       

        {/* <Badge badgeContent={this.state.newmessages} max={999} color="secondary" onClick={this.openChat}>
            <IconButton style={{ color: "#ffffff", backgroundColor: "#323232", margin: "5px", width:"50px", height:"50px"  }} >
                <ChatIcon />
            </IconButton>
        </Badge> */}
        <IconButton onClick={handleClickOpen} style={{ ...IconButtonStyle,backgroundColor: "#5a6bda"}} > <PeopleIcon/> </IconButton>
        <IconButton style={{ ...IconButtonStyle,backgroundColor: "#5a6bda"}} onClick={imageCapture}> < CameraAltRoundedIcon/> </IconButton>
       <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle onClose={handleClose} id="responsive-dialog-title">Participants  </DialogTitle>
        <DialogContent>
           <Participants peers={props.peers} /> 
        </DialogContent>
        <DialogActions>
          <Button  style= {{color : "#fff"}} onClick={handleClose}  > Close</Button>
        </DialogActions>
        
      </Dialog>
      <MessageBox chats={props.chats} socketId={props.socketId} inputRef={props.inputRef} sendMessage={props.sendMessage}/>


      <IconButton style={{ ...IconButtonStyle,backgroundColor: "#5a6bda"}} onClick={handleClickOpen}> < BrushIcon/> </IconButton>
       <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
       <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              White Board
            </Typography>
          </Toolbar>
        </AppBar>
        <Board />
        
      </Dialog>
    </div>


    )
}

export default VideoCallBar;
