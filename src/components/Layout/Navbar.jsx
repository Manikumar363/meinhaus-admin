import React from "react";
import { navLinks } from "../../constants";
import LogoutButton from "../LogoutButton";

const Navbar = () => {
  return (
    <div>
      <header className="bg-white shadow-sm border-b border-gray-200 shrink-0">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Icons retained */}
            {navLinks.map((item) => (
              <div className="relative">
                {item.icon}
                <span className="absolute -top-3 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  10
                </span>
              </div>
            ))}

            <LogoutButton className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
