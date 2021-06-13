
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../Actions/auth'
import logo from '../../Assets/loginms.svg'

class Login extends React.Component {

  handleLoginBtn = (e) => this.props.dispatch(login())

  render() {
    const {auth} = this.props;
    if(auth.uid && auth.isLoaded){
      return <Redirect to="/" />
    }
    return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container px-0">
        <h1 className="font-weight-normal">Login Route</h1>
        <p className="lead mt-4">Welcome to MS Auth React Redux Firebase App. Now logging into application is now just one-click away.</p>
        <button className="btn btn-dark p-0 mt-5" onClick={this.handleLoginBtn}>
          <img className="rounded" src={logo} alt="Ms Auth Btn"/>
        </button>
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
