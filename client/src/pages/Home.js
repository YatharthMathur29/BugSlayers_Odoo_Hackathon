import React, { useEffect, useState } from "react";
import { getAllQuestions } from "../firebase/firestore";
import { Link } from "react-router-dom";

export default function Home() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const qList = await getAllQuestions();
      setQuestions(qList);
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Questions</h1>

      {questions.map((q) => (
        <div key={q.id} className="border rounded p-4 mb-4 shadow hover:shadow-lg transition">
          <Link to={`/question/${q.id}`}>
            <h2 className="text-xl font-semibold text-blue-700 hover:underline">{q.title}</h2>
          </Link>
          <p className="text-gray-700 mt-2">{q.description?.slice(0, 100)}...</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {q.tags?.map((tag, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                #{tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Posted on: {q.timestamp?.toDate?.().toLocaleString?.() || "Unknown"}
          </p>
        </div>
      ))}
    </div>
  );
}
