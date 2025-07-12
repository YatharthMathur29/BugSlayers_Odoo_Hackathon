// client/src/firebase/firestore.js

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  where
} from "firebase/firestore";

import { db } from "./firebase"; // Make sure firebase.js exports db

// ==============================
// 🔹 QUESTIONS
// ==============================

// Add a new question
export async function addQuestion(questionData) {
  const questionsRef = collection(db, "questions");
  const docRef = await addDoc(questionsRef, {
    ...questionData,
    timestamp: new Date()
  });
  return docRef.id;
}

// Get all questions (newest first)
export async function getAllQuestions() {
  const q = query(collection(db, "questions"), orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Get a specific question by ID
export async function getQuestionById(id) {
  const docRef = doc(db, "questions", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

// ==============================
// 🔹 ANSWERS
// ==============================

// Add an answer to a specific question
export async function addAnswer(questionId, answerData) {
  const answersRef = collection(db, "questions", questionId, "answers");
  const docRef = await addDoc(answersRef, {
    ...answerData,
    votes: 0,
    timestamp: new Date()
  });
  return docRef.id;
}

// Get all answers for a specific question
export async function getAnswers(questionId) {
  const answersRef = collection(db, "questions", questionId, "answers");
  const q = query(answersRef, orderBy("timestamp", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Vote on an answer (voteType = "up" or "down")
export async function voteAnswer(questionId, answerId, voteType) {
  const answerRef = doc(db, "questions", questionId, "answers", answerId);
  const docSnap = await getDoc(answerRef);

  if (!docSnap.exists()) return;

  const currentVotes = docSnap.data().votes || 0;
  const newVotes = voteType === "up" ? currentVotes + 1 : currentVotes - 1;

  await updateDoc(answerRef, { votes: newVotes });
}

// ==============================
// 🔹 NOTIFICATIONS
// ==============================

// Add a notification for a user
export async function addNotification(userId, message) {
  const notificationsRef = collection(db, "notifications");
  await addDoc(notificationsRef, {
    userId,
    message,
    read: false,
    timestamp: new Date()
  });
}

// Get all notifications for a user (newest first)
export async function getUserNotifications(userId) {
  const q = query(
    collection(db, "notifications"),
    where("userId", "==", userId),
    orderBy("timestamp", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
