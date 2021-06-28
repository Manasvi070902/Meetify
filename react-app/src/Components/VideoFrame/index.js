import React , {useRef , useEffect} from 'react'
import{Row} from 'react-bootstrap'
import io from 'socket.io-client';
import Peer, { Instance, SignalData } from 'simple-peer';
import GridListTile from '@material-ui/core/GridListTile';

export const VideoFrame = (props) => {
    const ref = useRef(document.createElement('video'));

    useEffect(() => {
        props.peer.on("stream", (stream) => {
            ref.current.srcObject = stream;
            console.log(stream.getTracks()[1])
         
        })
    }, []);



    return (
     
            <video id="my-video" autoPlay ref={ref}  playsInline ></video>
      
    )
}

