"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import UserProfile from "./UserProfile";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 py-4 backdrop-blur-sm bg-opacity-90">
      <nav className="container mx-auto flex justify-between items-center px-6">
        {/* Logo with subtle glow */}
        <div className="group">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent transition-all duration-500 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]"
          >
            <span className="tracking-tighter">StockSlinger</span>
            <span className="text-blue-400 text-xs font-normal ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
        </div>

        {/* Navigation with refined underline effect */}
        <ul className="hidden md:flex space-x-8">
          {[
            { name: "Home", path: "/" },
            { name: "Market Overview", path: "/market-overview" },
            { name: "Portfolio", path: "/portfolio" },
            { name: "News", path: "/news" },
          ].map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className="relative text-gray-300 font-medium hover:text-white transition-colors duration-200 py-2 px-1"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-cyan-400 transition-all duration-300 -translate-x-1/2 group-hover:w-4/5"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth section */}
        <div className="ml-6">
          {user ? (
            <UserProfile />
          ) : (
            <Link
              href="/api/auth/login"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-2 px-6 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400/50"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
