import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

// Your web app's Firebase configuration
// Put your SDK details
const firebaseConfig = {
    apiKey: "AIzaSyCRFltWlE0bVhWfQsfYxvV52B5hinjExnA",
    authDomain: "teams-clone-20c1d.firebaseapp.com",
    projectId: "teams-clone-20c1d",
    databaseURL : "https://teams-clone-20c1d-default-rtdb.firebaseio.com/",
    storageBucket: "teams-clone-20c1d.appspot.com",
    messagingSenderId: "439384179574",
    appId: "1:439384179574:web:c2698ab30eba91f9ed3057"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });
export default firebase


// Initialize Provider & Export
export const microsoftProvider = new firebase.auth.OAuthProvider('microsoft.com')
export const googleProvider = new firebase.auth.GoogleAuthProvider()