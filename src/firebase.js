// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 
const firebaseConfig = {
    apiKey: "AIzaSyDQucc9xQNzVH0Xknmn83D5Bmam9gy6ErI",
    authDomain: "jello-75423.firebaseapp.com",
    projectId: "jello-75423",
    storageBucket: "jello-75423.appspot.com",
    messagingSenderId: "878577750624",
    appId: "1:878577750624:web:ca80f2789e3cbc7c1f6905",
    measurementId: "G-G3X9K816CB",
  };

  const app = initializeApp(firebaseConfig);
  
export const auth = getAuth(app);   
export default app