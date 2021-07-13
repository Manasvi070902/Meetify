import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../Actions/auth'
import pic from '../../Assets/loginbg.svg'
import styles from"./login.module.css"
import {  Button } from 'react-bootstrap'
import { useStyles } from '../../Utils/globalStyles'



const Login =(props) => {
  const handleLoginBtn = (e) => props.dispatch(login())
  const classes = useStyles();

    const {auth} = props;
    //protected route
    if(auth.uid && auth.isLoaded){
      return <Redirect to="/" />
    }
    return (
 
    <main className={classes.content}>
    <div className={classes.toolbar} />
    
    <div className="  d-lg-flex  d-md-flex justify-content-center p-lg-5 m-lg-10 ">
      <div className="container col-12 col-lg-7 px-0 mt-5">
        <h1 className={styles['main-heading']}>Meetify</h1>
        <h5 className={[styles['main-text'] ,"mt-4"].join(' ')}>Meet, chat, notes in just one place!</h5>
        <Button className="p-2 mt-5" onClick={handleLoginBtn} variant="info">Sign In with Google
        </Button>
       
      </div>
      <div className="col-12 mt-4  col-lg-5">
      <img className="img-fluid rounded float-right " src={pic} alt="pic"/>
      </div>
    </div>
    </main>
   
    )
  }


const mapStateToProps = ({auth, firebase}) => {
  return {
    auth: firebase.auth,
    authError: auth.authError
  }
}

export default connect(mapStateToProps)(Login)
