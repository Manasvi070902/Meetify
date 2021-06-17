import {microsoftProvider} from '../Utils/firebase'

// Action Types
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED'
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'


export const login = () => {
  return (dispatch, getState, {getFirebase,getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().signInWithPopup(microsoftProvider).then(resp => {
      console.log(resp)
      return firestore.collection('users').doc(resp.user.uid).set({
        displayName : resp.user.displayName,
        email:resp.user.email
        
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