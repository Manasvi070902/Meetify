import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import auth from './auth'

export default combineReducers({
  auth,
  firebase: firebaseReducer
});
