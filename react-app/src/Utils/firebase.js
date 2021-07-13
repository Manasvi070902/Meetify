import firebase from "firebase";

// Your web app's Firebase configuration
// Put your SDK details
const firebaseConfig = {
  apiKey: "AIzaSyCF50jEiTBaH7uhlO59Eu38EW_-ayyy3Zo",
    authDomain: "meetify-a0446.firebaseapp.com",
    projectId: "meetify-a0446",
    storageBucket: "meetify-a0446.appspot.com",
    messagingSenderId: "863424801228",
    appId: "1:863424801228:web:e60dfee10b9801a5f01569"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firestore
export const db = firebase.firestore();

export default firebase


// Initialize Provider & Export
export const microsoftProvider = new firebase.auth.OAuthProvider('microsoft.com')
export const googleProvider = new firebase.auth.GoogleAuthProvider()

export const auth = firebase.auth();