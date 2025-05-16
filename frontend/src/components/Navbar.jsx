import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';

function Navbar({ setQuery }) {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
      <div className="text-2xl font-bold text-indigo-600">
        <Link to="/">NoteApp</Link>
      </div>

      <div className="w-full sm:max-w-md">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-700 font-medium">{user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
