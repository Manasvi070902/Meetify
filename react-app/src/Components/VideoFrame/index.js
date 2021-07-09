import React , {useRef , useEffect} from 'react'


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

