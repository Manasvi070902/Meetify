
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../Actions/auth'
import logo from '../../Assets/loginms.svg'
import pic from '../../Assets/microsoft_teams.png'
import styles from"./login.module.css"

class Login extends React.Component {
  handleLoginBtn = (e) => this.props.dispatch(login())

  render() {
    const {auth} = this.props;
    if(auth.uid && auth.isLoaded){
      return <Redirect to="/" />
    }
    return (
   
    
    <div className=" row p-5">
      <div className="container col-12 col-lg-8 px-0 pt-5 ">
        <h1 className={styles['main-heading']}>Microsoft Teams</h1>
        <h4 className={[styles['main-text'] ,"mt-4"].join(' ')}>Meet, chat, call in just one place!</h4>
        <button className="btn btn-dark p-0 mt-5" onClick={this.handleLoginBtn}>
          <img className="rounded" src={logo} alt="Ms Auth Btn"/>
        </button>
       
      </div>
      <div className="col-5 col-lg-4">
      <img className="rounded w-80 px-0  h-auto" src={pic} alt="Ms Auth Btn"/>
      </div>
    </div>
   
    )
  }
}

const mapStateToProps = ({auth, firebase}) => {
  return {
    auth: firebase.auth,
    authError: auth.authError
  }
}

export default connect(mapStateToProps)(Login)
