import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getQuestionById,
  getAnswers,
  addAnswer,
  voteAnswer,
} from "../firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function QuestionDetails() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const q = await getQuestionById(id);
      const a = await getAnswers(id);
      setQuestion(q);
      setAnswers(a);
    }
    fetchData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!currentUser) return alert("Login to answer.");
    await addAnswer(id, {
      text: answerText,
      userId: currentUser.uid,
      email: currentUser.email,
      votes: 0,
    });
    setAnswerText("");
    const updated = await getAnswers(id);
    setAnswers(updated);
  }

  async function handleVote(answerId, type) {
    if (!currentUser) return alert("Login to vote.");
    await voteAnswer(id, answerId, type);
    const updated = await getAnswers(id);
    setAnswers(updated);
  }

  if (!question) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{question.title}</h1>
      <p className="mt-2 text-gray-700">{question.description}</p>
      <div className="flex gap-2 mt-2">
        {question.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Posted on: {question.timestamp?.toDate?.().toLocaleString?.()}
      </p>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">Answers</h2>
      {answers.map((a) => (
        <div key={a.id} className="border rounded p-3 mb-3">
          <p>{a.text}</p>
          <p className="text-sm text-gray-500 mt-1">By: {a.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => handleVote(a.id, "up")}
              className="text-green-600 font-bold hover:scale-110"
              title="Upvote"
            >
              ⬆️
            </button>
            <span>{a.votes || 0}</span>
            <button
              onClick={() => handleVote(a.id, "down")}
              className="text-red-600 font-bold hover:scale-110"
              title="Downvote"
            >
              ⬇️
            </button>
          </div>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="mt-6">
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Your answer..."
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Post Answer
        </button>
      </form>
    </div>
  );
}
