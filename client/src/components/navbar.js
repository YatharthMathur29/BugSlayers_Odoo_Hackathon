import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserNotifications } from "../firebase/firestore";

export default function Navbar() {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchNotifications() {
      if (currentUser) {
        const data = await getUserNotifications(currentUser.uid);
        setNotifications(data);
      }
    }
    fetchNotifications();
  }, [currentUser]);

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gray-800 text-white shadow">
      <Link to="/" className="text-xl font-bold">
        StackIt
      </Link>

      <div className="flex items-center gap-4">
        {currentUser && (
          <div className="relative">
            <button onClick={() => setOpen(!open)} className="relative">
              🔔
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded shadow-lg z-10 max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-3 text-gray-500">No notifications</p>
                ) : (
                  notifications.map((note) => (
                    <div
                      key={note.id}
                      className="border-b px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {note.message}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {currentUser ? (
          <span className="text-sm">Hi, {currentUser.email}</span>
        ) : (
          <>
            <Link to="/login" className="text-sm hover:underline">
              Login
            </Link>
            <Link to="/register" className="text-sm hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
