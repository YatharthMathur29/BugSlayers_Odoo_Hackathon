// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC67Xu6FvN9xeFugacWl3jazq5wdWirnVc",
  authDomain: "stackit-66e0b.firebaseapp.com",
  projectId: "stackit-66e0b",
  storageBucket: "stackit-66e0b.firebasestorage.app",
  messagingSenderId: "291161294116",
  appId: "1:291161294116:web:baaf5e93c00f8d59f29fb1",
  measurementId: "G-0G33EDQYHC"
};

// ✅ Initialize app
const app = initializeApp(firebaseConfig);

// ✅ Optional analytics
const analytics = getAnalytics(app);

// ✅ Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
