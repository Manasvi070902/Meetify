
import React, { useEffect, useRef, useState,useCallback } from "react";
import {useLocation} from "react-router-dom";
import VideoCallBar from '../../Components/VideoCallBar'
import { VideoFrame } from '../../Components/VideoFrame'
import io from 'socket.io-client';
import Peer, { Instance, SignalData } from 'simple-peer';
import './videopage.css'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom';
import{Row} from 'react-bootstrap'

    
export const VideoPage = (props) => {
 
  const userVideo = useRef(document.createElement('video'))
  const userStream = useRef()

    const socketRef = useRef();
    const peersRef = useRef([]);
   
    const { auth } = props
    const history = useHistory()
    //get query parameter
   const search = useLocation().search;
   const params = new URLSearchParams(search);

   const [peers, setPeers] = useState([]);
   const [audio, setAudio] = useState(true);
   const [video, setVideo] = useState(true);
   const [showDrawerChildren, setShowDrawerChildren] = useState(false)
   const [open, setOpen] = useState(false);
 
   useEffect(() => {
    init()
}, [])
const init = useCallback(async() => {
  socketRef.current = io.connect("http://127.0.0.1:5000")
  const stream = await navigator.mediaDevices.getUserMedia({ audio: audio, video: video })
  userVideo.current.srcObject = userStream.current = stream
   
      
      console.log(stream)
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
                return;
          }
          socketRef.current.emit("join room", { roomID: params.get('room'), token: localStorage.getItem('idToken') })

          socketRef.current.on("invalid room", () => {
            alert("Invalid room")
            return;
        })
        socketRef.current.on("room full", () => {
          alert("Room full")
          return;
      })
      }
      setShowDrawerChildren(true)

      //get all member details and create peers
      socketRef.current.on("all members", (members) => {
        console.log(members)
        const peers = members.map(member => {
        
            const peer = createPeer(member.id, socketRef.current.id, stream);
            console.log("stream", stream)
            const peerObj = {
                peerID: member.id,
                peer,
                username: member.username
            }
            peersRef.current.push(peerObj)
            return peerObj
        })
        console.log(peers)
            setPeers(peers)
        })
    
        socketRef.current.on("user joined", (payload) => {
          console.log("user joined")
          const { signal, id, username } = payload
          console.log(signal)
          const peer = addPeer(signal, id, stream)
          const peerObj = {
              peerID: id,
              peer,
              username
          }
          peersRef.current.push(peerObj)
          addPeerVideo(peerObj)
      })

      socketRef.current.on("receiving returned signal", (payload) => {
          console.log("receiving returned signal")
          const { signal, id } = payload
          const item = peersRef.current.find((p) => p.peerID === id);
          if(item){
              item.peer.signal(signal)
          }
      })
      socketRef.current.on("unauthorized", (message) => {
        alert(message)
        exit()
    })

    socketRef.current.on("disconnected", ({ id, username }) => {
        disconnected({ id, username })
    })

    socketRef.current.on("something broke", (message) => {
        alert(message)
        exit()
    })
    
  
    }, []);
    

    const createPeer = useCallback((userToSignal, callerID, stream) => {
      // console.log("create peer")
      const peer = new Peer({
          initiator: true,
          trickle: false,
          stream
      })

      peer.on("signal", (signal) => {
          socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
      })

      return peer
  }, [])

  const addPeer = useCallback((incomingSignal, callerID, stream) => {
      // console.log("add peer")
      const peer = new Peer({
          initiator: false,
          trickle: false,
          stream
      })

      peer.on("signal", (signal) => {
          console.log(signal)
          socketRef.current.emit("returning signal", { signal, callerID })
      })

      peer.signal(incomingSignal)
      return peer
  }, [])

  const addPeerVideo = useCallback((peerObj) => {
      setPeers(peers => [...peers, peerObj])
  }, [])

  const removePeerVideo = useCallback((id) => {
      setPeers(peers => peers.filter(peer => peer.peerID !== id))
  }, [])

  const exit = useCallback(() => {
      socketRef.current.disconnect()
      history.replace("/")
      userStream.current?.getTracks().forEach((track) => {
          track.stop();
      });
  }, [])

  const disconnected = useCallback(({ id, username }) => {
      alert(username + "left the chat")
      peersRef.current = peersRef.current.filter(peer => peer.peerID !== id)
      removePeerVideo(id)
  }, [])
  
  
    if(!auth.uid && auth.isLoaded){
        return <Redirect to="/login" />
      }
    return (
        <div className="main-container">
            <VideoCallBar exit={exit} audio={audio} video={video}/>
           
           
      <div id="video-grid">
                    {peers.map((peer, index) => (
                        <VideoFrame key={index} peer={peer.peer} />
                    ))}

                <Row id="main" className="flex-container" className="peer-video" style={{ margin: 0, padding: 0 }}> 
                <div>{auth.displayName}</div>   
            <video id="my-video"  autoPlay ref={userVideo}  playsInline style={{
                borderStyle: "solid",
                borderColor: "#fff",
                objectFit: "fill",
                width: "30%",
                height: "100%"
            }}></video>
            </Row>
      
                    </div>
      
    
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
