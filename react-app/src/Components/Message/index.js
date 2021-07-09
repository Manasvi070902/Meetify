import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import './message.css';


const Message = (props) => {
  const { sender, message, id } = props.chat
  const { auth } = props
  console.log(props.chat)

  //to determine whether the message is sent by current user
  const sentByMe = useMemo(() => {
    return id === "me"
  }, [])


  return (
    <div id={sentByMe ? "userMessage" : "readMessage"} >
      {sentByMe && <b>{auth.displayName}</b>}
      {!sentByMe && <b>{sender}</b>}
      <p style={{ wordBreak: "break-all" }}>{message}</p>
    </div>


  )
}
const mapStateToProps = ({ auth, firebase }) => {
  return {
    auth: firebase.auth,
    authError: auth.authError
  }
}
export default connect(mapStateToProps)(Message)
