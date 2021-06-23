import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../Actions/auth'
import pic from '../../Assets/microsoft_teams.png'
import styles from"./login.module.css"
import {  Button } from 'react-bootstrap'
import { useStyles } from '../../Utils/globalStyles'



const Login =(props) => {
  const handleLoginBtn = (e) => props.dispatch(login())
  const classes = useStyles();

    const {auth} = props;
    if(auth.uid && auth.isLoaded){
      return <Redirect to="/" />
    }
    return (
 
    <main className={classes.content}>
    <div className={classes.toolbar} />
    
    <div className=" row align-items-center p-lg-5 m-lg-5 ">
      <div className="container col-12 col-lg-8 px-0 pt-5 ">
        <h1 className={styles['main-heading']}>Microsoft Teams</h1>
        <h5 className={[styles['main-text'] ,"mt-4"].join(' ')}>Meet, chat, call in just one place!</h5>
        <Button className="p-2 mt-5" onClick={handleLoginBtn} variant="info">Sign In with Google
          {/* <img className="rounded" src={logo} alt="Ms Auth Btn"/> */}
        </Button>
       
      </div>
      <div className="col-5 col-lg-4 ">
      <img className="img-fluid rounded float-right w-60" src={pic} alt="pic"/>
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
