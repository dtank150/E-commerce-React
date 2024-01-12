// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBKmbHwAXwyXCP9h8mjc5XdhHxwMR4DfU",
  authDomain: "e-commerce-305aa.firebaseapp.com",
  projectId: "e-commerce-305aa",
  storageBucket: "e-commerce-305aa.appspot.com",
  messagingSenderId: "522674962058",
  appId: "1:522674962058:web:106aae738f965748e03773",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
