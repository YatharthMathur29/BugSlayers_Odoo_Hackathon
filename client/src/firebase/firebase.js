// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC67Xu6FvN9xeFugacWl3jazq5wdWirnVc",
  authDomain: "stackit-66e0b.firebaseapp.com",
  projectId: "stackit-66e0b",
  storageBucket: "stackit-66e0b.firebasestorage.app",
  messagingSenderId: "291161294116",
  appId: "1:291161294116:web:baaf5e93c00f8d59f29fb1",
  measurementId: "G-0G33EDQYHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getAuth } from "firebase/auth";

export const auth = getAuth(app);