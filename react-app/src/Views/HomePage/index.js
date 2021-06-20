import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
// import styles from"./home.module.css"

import  {Button } from 'react-bootstrap'

const HomePage = (props) => {


  const {auth} = props;
  if(!auth.uid && auth.isLoaded){
    return <Redirect to="/login" />
  }
  const startMeet = async() => {
      window.open(`/room?host=${true}`)
  }
  
    return (
      
        <div className="container px-0">
        <p className="lead mt-4 mb-2">Hi <span className="text-primary">{auth.displayName}</span>!</p>
          <p className="lead mt-4 mb-2">Welcome to MS Teams.</p>
          <Button className="p-2 mt-5"  variant="info"  onClick={startMeet} >Create Meet</Button> <br />
        <Button className="p-2 mt-5"  variant="danger">Join Meet
        </Button>
          
        </div>
      
    )
  }
  const mapStateToProps = ({auth, firebase}) => {
    return {
      auth: firebase.auth,
      authError: auth.authError
    }
  }
  export default connect(mapStateToProps)(HomePage)


 

