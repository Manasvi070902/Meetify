import { googleProvider } from '../Utils/firebase'
import axios from 'axios'
import { APIBaseURL } from '../constants'
//import {microsoftProvider ,googleProvider} from '../Utils/firebase'

// Action Types
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED'
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'

export const login = () => {

  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase.auth().signInWithPopup(googleProvider).then(resp => {
      console.log(resp)

      firestore.collection('users').doc(resp.user.uid).set({
        name: resp.user.displayName,
        picture: resp.user.photoURL,
        email: resp.user.email,
        isActive: true
      }).then(resp => console.log("user added to database")).catch((err) => console.log(err))

      localStorage.setItem('userID', resp.user.uid);

      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {

        //user details [user is signed in], mongodb store
        var user = resp.user;
        axios({
          method: 'POST',
          url: `${APIBaseURL}/users`,
          headers: {
            'authtoken': idToken,
            'Content-Type': 'application/json',
          },
          redirect: 'follow'
        }).then(resp => console.log("user added to database"))

        localStorage.setItem('idToken', idToken);

      })

    }).then((result) => {
      console.log("Login successfully done...")
      dispatch({ type: LOGIN_SUCCEEDED });
    })
      .catch((err) => {
        dispatch({ type: LOGIN_FAILED });
      })
  }
}

export const logout = () => {

  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase.auth().signOut()
      .then(() => {
        dispatch({ type: LOGOUT_SUCCEEDED })

        firestore.collection('users').doc(localStorage.getItem('userID')).update({
          "isActive": false
        }).then(resp => console.log("user logged out")).catch((err) => console.log(err))
      })
      .catch((err) => {
        dispatch({ type: LOGOUT_FAILED, err })
      })
  }
}

