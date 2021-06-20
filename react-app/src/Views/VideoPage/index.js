
import React, { useEffect, useRef } from "react";
import {useLocation} from "react-router-dom";
import VideoCallBar from '../../Components/VideoCallBar'
import { VideoFrame } from '../../Components/VideoFrame'
import io from 'socket.io-client';
import Peer, { Instance, SignalData } from 'simple-peer';
import './videopage.css'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import{Row} from 'react-bootstrap'


export const VideoPage = (props) => {
    
   
    const videoRef = useRef(null);
    const socketRef = useRef();

    //get query parameter
   const search = useLocation().search;
   const params = new URLSearchParams(search);
   const {auth} = props;
    useEffect(() => {
      socketRef.current = io.connect("http://127.0.0.1:5000")
      console.log(socketRef)
      const getUserMedia = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({video: true, audio:true});
          videoRef.current.srcObject = stream;
        } catch (err) {
          console.log(err);
        }
      };
      getUserMedia();

      if(params.get('host') && !params.get('room')){
       console.log(localStorage.getItem('idToken'))
        socketRef.current.emit("start meet", localStorage.getItem('idToken'))
       
        socketRef.current.on("roomID", (roomID) => {
            console.log(roomID)
            window.history.replaceState("", "", `?room=${roomID}`);
        })
      }else{
          if(params.get('host') || !params.get('room')|| typeof params.get('room') !== 'string') {
            alert("Enter a valid url")
                exit()
                return;
          }
          socketRef.current.emit("join room", { roomID: params.get('room'), token: localStorage.getItem('idToken') })

          socketRef.current.on("invalid room", () => {
            alert("Invalid room")
            exit()
            return;
        })
        socketRef.current.on("room full", () => {
          alert("Room full")
          exit()
          return;
      })
      }
     
    

    }, []);
    

    
    if(!auth.uid && auth.isLoaded){
        return <Redirect to="/login" />
      }
    return (
        <div className="main-container">
            <VideoCallBar />
            {/* <VideoFrame ref= {videoRef}/> */}
            {/* <video 
        ref={videoRef}
        autoPlay
      /> */}
      <Row id="main" className="flex-container justify-content-center" style={{ margin: 0, padding: 0 }}>
            <video id="my-video"  autoPlay ref={videoRef} muted style={{
                borderStyle: "solid",
                borderColor: "#fff",
                objectFit: "fill",
                width: "30%",
                height: "100%",
                marginTop : "10%"
            }}></video>
            
        </Row>
        </div>
    )
}
const mapStateToProps = ({auth, firebase}) => {
    return {
      auth: firebase.auth,
      authError: auth.authError
    }
  }
  export default connect(mapStateToProps)(VideoPage)
