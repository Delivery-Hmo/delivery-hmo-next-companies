import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, } from "firebase/firestore";

//client
const firebaseConfig = {
  apiKey: "AIzaSyDDrWzTSNp5Mtif3GHO6jlWb16s7NEvsDw",
  authDomain: "house-construction-3fca4.firebaseapp.com",
  projectId: "house-construction-3fca4",
  storageBucket: "house-construction-3fca4.firebasestorage.app",
  messagingSenderId: "934599026649",
  appId: "1:934599026649:web:3608ec0269694ced53dbc8",
  measurementId: "G-RJJGQ5CHQV"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { db, auth };