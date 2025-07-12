import React, { useState } from "react";
import { addQuestion, addNotification } from "../firebase/firestore";
import { useAuth } from "../context/AuthContext";

export default function Ask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagArray = tags.split(",").map((tag) => tag.trim());

    try {
      const questionId = await addQuestion({
        title,
        description,
        tags: tagArray,
        userId: currentUser?.uid || "guest",
        email: currentUser?.email || "anonymous",
      });

      // Optional: Add a notification to the user
      if (currentUser) {
        await addNotification(
          currentUser.uid,
          `✅ Your question "${title}" was posted.`
        );
      }

      alert("✅ Question Posted!");

      // Clear form
      setTitle("");
      setDescription("");
      setTags("");
    } catch (err) {
      alert("❌ Failed to post question");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          placeholder="Describe your question..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded h-32"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Post Question
        </button>
      </form>
    </div>
  );
}
