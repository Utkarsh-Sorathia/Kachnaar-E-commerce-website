import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuU8riw4oVNYK3It7RwiKMeamD1sXHxKY",
  authDomain: "login-page-acc80.firebaseapp.com",
  projectId: "login-page-acc80",
  storageBucket: "login-page-acc80.appspot.com",
  messagingSenderId: "897419398696",
  appId: "1:897419398696:web:f13e4689ea783729d6af1d"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account ",
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = firebase.firestore()
export default auth;
