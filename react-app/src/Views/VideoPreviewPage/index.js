import React,{useRef, useEffect, useCallback, useState} from 'react'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import  {Button } from 'react-bootstrap'
import {useLocation} from "react-router-dom";
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export const VideoPreviewPage = (props) => {
    const userVideo = useRef(document.createElement('video'))
   
    const[audio,setAudio] = useState(true)
    const [video,setVideo] = useState(true)
    const { auth } = props
   //get query parameter
   const search = useLocation().search;
   const params = new URLSearchParams(search);
 const value = params.get('room');
    const joinMeet = async() => {
       window.open(`/room?room=${value}`)
      // <Redirect to={{
      //   pathname: '/room?room=${value}',
      //   state: { audio: audio, video:video }
      // }} />
  }
  useEffect(() => {
    initpreview()
}, [])
const initpreview = useCallback(async() => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
  userVideo.current.srcObject  = stream;
})



const audioChangeHandler = () => {
  console.log(audio)
  setAudio(!audio)
  userVideo.current.srcObject.getAudioTracks()[0].enabled = !(userVideo.current.srcObject.getAudioTracks()[0].enabled);
 
}

const videoChangeHandler = () => {
  console.log(video)
  setVideo(!video)
  userVideo.current.srcObject.getVideoTracks()[0].enabled = !(userVideo.current.srcObject.getVideoTracks()[0].enabled);
}

    return (
        <>
        
        <Grid container spacing={1} alignItems="center" justify="center" style={{ minHeight: '90vh' }}>
        <Grid item xs={12}  sm={4} >
         <p id="overlay">{auth.displayName}</p>
        <video id="my-video" muted  autoPlay ref={userVideo}  playsInline ></video>
        </Grid>
        <FormGroup row>
      <FormControlLabel
        control={<Switch checked={video} onChange={videoChangeHandler} name="video" />}
        label="Video"
      />
      <FormControlLabel
        control={
          <Switch
            checked={audio}
            onChange={audioChangeHandler}
            name="audio"
            color="secondary"
          />
        }
        label="Audio"
      />
      </FormGroup>
        <Button className="p-2 m-1"  variant="danger" onClick = {joinMeet} >Join Meet </Button>
        </Grid>
        </>
    )
}

const mapStateToProps = ({auth, firebase}) => {
    return {
      auth: firebase.auth,
      authError: auth.authError
    }
  }
  export default connect(mapStateToProps)(VideoPreviewPage)

