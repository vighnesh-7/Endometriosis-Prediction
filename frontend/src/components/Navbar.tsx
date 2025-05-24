
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-white/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Endo Predict" className="h-8 w-8" />
          <span className="text-xl font-bold gradient-text">Endo Predict</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`nav-link ${isActive("/")}`}>
            Home
          </Link>
          <Link to="/predict" className={`nav-link ${isActive("/predict")}`}>
            Predict
          </Link>
        </nav>
        
        <div className="flex md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            aria-label="Main menu"
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
