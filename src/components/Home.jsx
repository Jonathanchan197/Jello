import React, {useState} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from '../firebase'

const Home = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    return (
        <div>
            <h1>Welcome {}</h1>
        </div>
    )
}

export default Home