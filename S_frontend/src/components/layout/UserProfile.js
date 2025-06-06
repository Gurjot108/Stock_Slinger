"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const UserProfile = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {user ? (
        <>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium tracking-wide
              transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50
              focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Hi, {user.name.split(" ")[0]}
            </span>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl backdrop-blur-sm z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-sm font-medium text-gray-300">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 transition duration-200
                  flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </>
      ) : (
        <Link
          href="/api/auth/login"
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-2 px-6 rounded-full text-sm font-medium 
            transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default UserProfile;
