// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLFsmWZHyh2DXA8YIm1enlsqba5YH5JAQ",
  authDomain: "chatapp-4b3b0.firebaseapp.com",
  projectId: "chatapp-4b3b0",
  storageBucket: "chatapp-4b3b0.appspot.com",
  messagingSenderId: "1049366372847",
  appId: "1:1049366372847:web:96d2b1bd4d4cb026a1d61a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)