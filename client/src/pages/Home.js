import React from "react";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome to StackIt 👋</h1>
      {user ? (
        <p>You're logged in as {user.email}</p>
      ) : (
        <p>Please login or register to continue.</p>
      )}
    </div>
  );
}

export default Home;
