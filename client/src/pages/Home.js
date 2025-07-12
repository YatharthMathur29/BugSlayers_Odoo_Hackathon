import React from "react";
import { useAuth } from "../context/AuthContext";
import { logout } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

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
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome to StackIt 👋</h1>
      {user ? (
        <div>
          <p>You're logged in as {user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Please login or register to continue.</p>
      )}
    </div>
  );
}

export default Home;

