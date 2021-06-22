import React , {useRef , useEffect} from 'react'
import{Row} from 'react-bootstrap'
import io from 'socket.io-client';
import Peer, { Instance, SignalData } from 'simple-peer';


export const VideoFrame = (props) => {
    const ref = useRef(document.createElement('video'));

    useEffect(() => {
        props.peer.on("stream", (stream) => {
            ref.current.srcObject = stream;
        })
    }, []);



    return (
        // <video autoPlay playsInline className="peer-video" ref={ref} />
       
    <div className="container">
        <Row id="main" className="flex-container" className="peer-video" style={{ margin: 0, padding: 0 }}>
            <video id="my-video" autoPlay ref={ref}  playsInline style={{
                borderStyle: "solid",
                borderColor: "#fff",
                objectFit: "fill",
                width: "30%",
                height: "100%"
            }}></video>
            
        </Row>
        
    </div>
      
    )
}

