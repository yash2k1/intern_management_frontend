import { useEffect, useState } from "react";
import drdo_logo_0 from "../../assets/drdo_logo_0.png";
import img from "../../assets/download.png";
import { useNavigate } from "react-router-dom";
import MainButtons from "./MainButtons";
import DeleteUserModal from "../modals/deleteUserPopUp";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [role, setRole] = useState(""); // ✅ Track role

  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // sign out
  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("⚠️ No token found. User may already be logged out.");
        return navigate("/sign-in");
      }

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/signout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      navigate("/sign-in");
    } catch (error) {
      console.error("Signout failed:", error);
    }
  };

  // sign in
  const handleSignInAnother = () => {
    navigate("/sign-in");
  };

  // delete user
const handleAccountDeletion = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("You must be logged in to delete an account.");
    return;
  }

  // ✅ Decode token to get userId
  let userId;
  try {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  } catch (err) {
    toast.error("Invalid token.", {
      style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
      icon: "❌",
    });
    return;
  }

  try {
    await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("User deleted successfully.");
    localStorage.removeItem("token"); // Optional: Clean up
    navigate("/sign-in");             // Redirect to login
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to delete user.",
      {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      }
    );
  }
};


  // ✅ Set role on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role || "");
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <>
      <header className="bg-primary dark:bg-[#001d3d] py-4 px-4 flex items-center justify-between space-x-4 overflow-hidden relative">
        <div className="flex items-center space-x-2 flex-shrink-0">
          <img
            src={drdo_logo_0}
            alt="Emblem"
            className="h-8 w-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

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

              {/* ✅ Only for mentor */}
              {role === "Mentor" && (
                <MainButtons
                  title={"Request HR Role"}
                  onClick={() => {
                    // pending... implement during API integration
                    setIsDropdownOpen(false);
                  }}
                  className={
                    "w-full text-left px-4 py-2 cursor-pointer bg-secondary hover:bg-primary text-white"
                  }
                />
              )}

              <button
                onClick={() => {
                  setIsDark(!isDark);
                  setIsDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 cursor-pointer bg-secondary hover:bg-primary text-white rounded-b-lg"
              >
                {isDark ? "Light Mode ☀️" : "Dark Mode 🌙"}
              </button>
{/* sign out  */}
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
              {/* change password */}
                
              <MainButtons
                className=  "w-full text-left px-4 py-2 cursor-pointer bg-secondary hover:bg-primary text-white"
                path={"/change-password"}
                title={"Change password"}
              />
{/* delete account */}
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
