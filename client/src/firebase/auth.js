import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db } from "./firebase"; // assuming db is exported from firebase.js
import { doc, setDoc } from "firebase/firestore";

const auth = getAuth();

// Register user and store info in Firestore
export async function register(email, password, username = "") {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Save additional user info in Firestore
  await setDoc(doc(db, "users", user.uid), {
    username,
    email,
    isAdmin: false,
    createdAt: new Date()
  });

  return user;
}

// Login user
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Logout user
export function logout() {
  return signOut(auth);
}

export { auth };
