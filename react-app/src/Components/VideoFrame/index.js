import React from 'react'
import{Row} from 'react-bootstrap'

export const VideoFrame = () => {
    return (
        
            
    <div className="container">
        <Row id="main" className="flex-container" style={{ margin: 0, padding: 0 }}>
            <video id="my-video"  autoPlay muted style={{
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

