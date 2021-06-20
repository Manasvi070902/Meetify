import {googleProvider} from '../Utils/firebase'
import axios from 'axios'
// import {microsoftProvider ,googleProvider} from '../Utils/firebase'

// Action Types
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED'
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'


export const login = () => {

  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signInWithPopup(googleProvider).then(resp => {
      console.log(resp)
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
     
     //user details [user is signed in]
      var user = resp.user;
      axios({
        method: 'POST',
        url : "http://localhost:5000/users",
        headers: {
            'authtoken': idToken,
            'Content-Type': 'application/json',
        },
        redirect: 'follow'
    }).then( resp => console.log("user added to database"))

    localStorage.setItem('idToken', idToken);
  
    })

    }).then((result) => {
      console.log("Login successfully done...")
      dispatch({type: LOGIN_SUCCEEDED});
    })
    .catch((err) => {
      dispatch({type: LOGIN_FAILED});
    })
  }
}

export const logout = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signOut()
    .then(()=>{
      dispatch({type: LOGOUT_SUCCEEDED})
    })
    .catch((err) => {
      dispatch({type: LOGOUT_FAILED, err})
    })
  }
}

