import {  LOGIN_SUCCEEDED, LOGOUT_SUCCEEDED, LOGIN_FAILED,LOGOUT_FAILED  } from "../Actions/auth";

const initialState = {
  authError: null
}

// Authed User Reducer [Defining action types of Reducer while authentication]
const auth = (state = initialState, action) => {
  switch(action.type){
   
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        authError: null
      }
    
    case LOGOUT_SUCCEEDED:
      return state;

    case LOGIN_FAILED:
        return {
          ...state,
          authError: 'Login Failed'
    };
      
    case LOGOUT_FAILED:
      return {
        ...state,
        authError: 'Logout Failed'
      };

    default:
      return state;
  }
}

export default auth;