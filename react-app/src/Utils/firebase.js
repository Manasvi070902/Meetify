import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

// Your web app's Firebase configuration
// Put your SDK details
const firebaseConfig = {
    apiKey: "AIzaSyCRFltWlE0bVhWfQsfYxvV52B5hinjExnA",
    authDomain: "teams-clone-20c1d.firebaseapp.com",
    projectId: "teams-clone-20c1d",
    storageBucket: "teams-clone-20c1d.appspot.com",
    messagingSenderId: "439384179574",
    appId: "1:439384179574:web:c2698ab30eba91f9ed3057"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });
export default firebase


// Initialize Provider & Export
export const microsoftProvider = new firebase.auth.OAuthProvider('microsoft.com').setCustomParameters({
    tenant: '23f2472b-c4af-48d9-9fee-8a566348ecb9',  // Put Tenant Id from Azure registered app,
    prompt: 'consent' // Get Consent from user to access their basic info (optional - Reommended only during SignUp)
  })