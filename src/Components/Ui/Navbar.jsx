import React, { useState } from 'react';
import drdo_logo_0 from '../../assets/drdo_logo_0.png';
import img from '../../assets/download.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate =useNavigate();
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleSignOut = () => {
    console.log("Logging out...");
    // Add logout logic here
  };
  const handleSignInAnother = () => {
    console.log("Signing in with another account...");
    // Add redirect logic here
  };

  return (
    <header className="bg-primary dark:bg-[#001d3d] py-4 px-4 flex items-center justify-between space-x-4 overflow-hidden relative">
      {/* Left Logo */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        <img src={drdo_logo_0} alt="Emblem" className="h-8 w-auto cursor-pointer"  onClick={()=>navigate('/')} />
      </div>

      {/* Right Profile & Dropdown */}
      <div className="relative">
        <div
          className="flex items-center space-x-2 text-white cursor-pointer"
          onClick={toggleDropdown}
        >
          <img
            src={img}
            alt="Profile"
            className="h-6 w-6 mx-1 sm:h-8 sm:w-8 sm:mx-4 rounded-full object-cover"
          />
          <div className="truncate max-w-[120px] text-sm leading-tight">Mr. Yash Gupta</div>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="fixed right-2 mt-2 w-56 rounded-lg shadow-lg z-50 text-sm">
            <button
              onClick={handleSignInAnother}
              className="w-full text-left px-4 py-2 bg-secondary hover:bg-primary rounded-t-lg text-white"
            >
              Sign in with another account
            </button>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2  bg-secondary hover:bg-primary rounded-b-lg text-white"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
