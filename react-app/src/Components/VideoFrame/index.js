import React , {useRef , useEffect} from 'react'
import{Row} from 'react-bootstrap'
import io from 'socket.io-client';
import Peer, { Instance, SignalData } from 'simple-peer';

export const VideoFrame = (props) => {
    

    return (
       
    <div className="container">
        <Row id="main" className="flex-container" style={{ margin: 0, padding: 0 }}>
            <video id="my-video"  autoPlay ref={props.ref} muted style={{
                borderStyle: "solid",
                borderColor: "#fff",
                objectFit: "fill",
                width: "60%",
                height: "100%"
            }}></video>
            
        </Row>
    </div>
      
    )
}

