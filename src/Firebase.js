import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDd8RED3zT-Csdr5kwzeN5E-mCk03JOco",
  authDomain: "login-page-c5797.firebaseapp.com",
  projectId: "login-page-c5797",
  storageBucket: "login-page-c5797.appspot.com",
  messagingSenderId: "936469521023",
  appId: "1:936469521023:web:16ac13765b9fab77ba154a"
};

firebase.initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

export default auth;