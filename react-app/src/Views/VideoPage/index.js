import React from 'react'
import VideoCallBar from '../../Components/VideoCallBar'
import { VideoFrame } from '../../Components/VideoFrame'
import './videopage.css'
export const VideoPage = () => {
    return (
        <div className="main-container">
            <VideoCallBar />
            <VideoFrame />
        </div>
    )
}

export default VideoPage;