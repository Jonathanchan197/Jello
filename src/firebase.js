// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyDvZZkicnAuNA7JniILaMthZ-V55hRzB2s",
  authDomain: "jello-e4c89.firebaseapp.com",
  projectId: "jello-e4c89",
  storageBucket: "jello-e4c89.appspot.com",
  messagingSenderId: "988673099814",
  appId: "1:988673099814:web:e215c2e73f22d2ae99bee7"
};

const app = initializeApp(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = getAuth(app);
export default app;
