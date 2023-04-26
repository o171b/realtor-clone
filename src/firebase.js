// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtTNmdQiddM8MMMNyvoULjwl2wAARG7ek",
  authDomain: "realtor-clone-react-9c5b3.firebaseapp.com",
  projectId: "realtor-clone-react-9c5b3",
  storageBucket: "realtor-clone-react-9c5b3.appspot.com",
  messagingSenderId: "884144569893",
  appId: "1:884144569893:web:df5eb372cadd1e898bc9cc"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()