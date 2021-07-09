import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider, useSelector } from 'react-redux';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import rootReducer from './Reducers'
import { getFirebase, isLoaded, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebaseConfig from './Utils/firebase'
import Loader from "react-loader-spinner";




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
  reduxFirestore(firebaseConfig)

))

// ReactReduxFirebaseProvider props
const rrfProps = {
  firebase: firebaseConfig,
  config: {},  // for firestore
  dispatch: store.dispatch
}

// Get Authentication Status before rendering children
function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  //loader added
  if (!isLoaded(auth)) {
    return (
      <div className="loading d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "black" }} >
        <Loader
          type="RevolvingDot"
          color="#14a2b8"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>

    )
  }
  ;
  return children
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);
