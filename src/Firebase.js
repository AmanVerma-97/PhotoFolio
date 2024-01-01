// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTsCD9gC6cS25syfgPsanpJV1gmy_CkNw",
  authDomain: "photofolio-cedd3.firebaseapp.com",
  projectId: "photofolio-cedd3",
  storageBucket: "photofolio-cedd3.appspot.com",
  messagingSenderId: "63480054806",
  appId: "1:63480054806:web:0e487d43466f10ae066137"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);