import React, { useEffect, useState } from "react";
import { getAllQuestions } from "../firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../firebase/auth";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const qList = await getAllQuestions();
      setQuestions(qList);
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Logout failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Questions</h1>
        {user && (
          <div>
            <p className="text-sm text-gray-600">Logged in as {user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {questions.map((q) => (
        <div
          key={q.id}
          className="border rounded p-4 mb-4 shadow hover:shadow-lg transition"
        >
          <Link to={`/question/${q.id}`}>
            <h2 className="text-xl font-semibold text-blue-700 hover:underline">
              {q.title}
            </h2>
          </Link>
          <p className="text-gray-700 mt-2">
            {q.description?.slice(0, 100)}...
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {q.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
              >
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
