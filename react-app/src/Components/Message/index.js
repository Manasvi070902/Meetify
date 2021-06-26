import React , { useMemo } from 'react'
import './message.css';

 const Message = ({ chat, socketID }) => {
    const { sender, message ,id} = chat
console.log(chat)
    const sentByMe = useMemo(() => {
        return id === "me"
    }, [])
    return (
   
    
        <div id={sentByMe ? "userMessage" : "readMessage"}>
          {!sentByMe && <b>{sender}</b>}
            <p style={{ wordBreak: "break-all" }}>{message}</p>
        </div>

    )
}
export default Message;