// src/firebase/auth.js

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth } from "./firebase";

// Register a new user
export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Login an existing user
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Logout the current user
export function logout() {
  return signOut(auth);
}
