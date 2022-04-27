// Setting up firebase to implement chat functionality
// Tutorial followed to learn firebase 
// https://www.youtube.com/watch?v=zQyrwxMPm88&ab_channel=Fireship

// Firebase packages
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Key from Firebase console
const firebaseApp = firebase.initializeApp( {
  apiKey: "AIzaSyAFcjtFpojoix8PQO7ocYzmeRpI8ywxQ50",
  authDomain: "bartermates-chat.firebaseapp.com",
  projectId: "bartermates-chat",
  storageBucket: "bartermates-chat.appspot.com",
  messagingSenderId: "573327267829",
  appId: "1:573327267829:web:5cdf93f1dbb3793233f2bc",
  measurementId: "G-MYKJCR6095"
})

const db = firebaseApp.firestore()

const auth = firebase.auth()

export { db, auth }