import { useEffect, useState } from "react";
import drdo_logo_0 from "../../assets/drdo_logo_0.png";
import img from "../../assets/download.png";
import { useNavigate } from "react-router-dom";
import MainButtons from "./MainButtons";
import DeleteUserModal from "../modals/deleteUserPopUp";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSignOut = () => {
    console.log("Logging out...");
    navigate("/sign-up");
    // Add logout logic here
  };

  const handleSignInAnother = () => {
    console.log("Signing in with another account...");
    navigate("/sign-in");
    // Add redirect logic here
  };

  const handleAccountDeletion = () => {
    console.log("Account deleted!");
    setShowDeleteModal(false);
    // Add real deletion logic here
  };
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <>
      <header className="bg-primary dark:bg-[#001d3d] py-4 px-4 flex items-center justify-between space-x-4 overflow-hidden relative">
        {/* Left Logo */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <img
            src={drdo_logo_0}
            alt="Emblem"
            className="h-8 w-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
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
            <div className="truncate max-w-[120px] text-sm leading-tight">
              Mr. Yash Gupta
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="fixed right-2 mt-2 w-56 rounded-lg shadow-lg z-50 text-sm">
              <MainButtons
                title={"Sign in with another account"}
                onClick={() => {
                  handleSignInAnother();
                  setIsDropdownOpen(false);
                }}
                className={
                  "w-full text-left px-4 py-2 cursor-pointer bg-secondary hover:bg-primary text-white"
                }
              />

              {/* only for mentor */}
              <MainButtons
                title={"Request HR Role"}
                onClick={() => {
                  //pending... implement during API integration
                  setIsDropdownOpen(false);
                }}
                className={
                  "w-full text-left px-4 py-2 cursor-pointer bg-secondary hover:bg-primary text-white"
                }
              />
              {/* 🌗 Dark/Light Mode Toggle */}
              <button
                onClick={() => {
                  setIsDark(!isDark);
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 cursor-pointer bg-secondary hover:bg-primary text-white rounded-b-lg"
              >
                {isDark ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
              </button>
              <MainButtons
                title={"Log Out"}
                onClick={() => {
                  handleSignOut();
                  setIsDropdownOpen(false);
                }}
                className={
                  "w-full text-left px-4 py-2 cursor-pointer bg-secondary hover:bg-primary text-white"
                }
              />
              <MainButtons
                title={"Delete Account"}
                onClick={() => {
                  setShowDeleteModal(true);
                  setIsDropdownOpen(false);
                }}
                className={
                  "w-full text-left px-4 py-2 cursor-pointer bg-secondary hover:bg-red-700 text-white rounded-b-lg"
                }
              />
            </div>
          )}
        </div>
      </header>


      {/* Delete Modal */}
      <DeleteUserModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleAccountDeletion}
        userName={"Yash Gupta"}
      />
    </>
  );
};

export default Navbar;
