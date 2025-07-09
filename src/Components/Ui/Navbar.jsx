import { useEffect, useState, useRef } from "react";
import drdo_logo_0 from "../../assets/drdo_logo_0.png";
import img from "../../assets/download.png";
import { useNavigate } from "react-router-dom";
import MainButtons from "./MainButtons";
import DeleteUserModal from "../modals/deleteUserPopUp";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import NavbarDropdownData from "../../data/NavbarDropDownData";
import { CSSTransition } from "react-transition-group";
import "../../AnimationStyle/NavbarDropdown.css";
import DropdownPortal from "./DropdownPortal";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const profileRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => {
      const newState = !prev;
      if (!newState || !profileRef.current) return newState;

      const rect = profileRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "absolute",
        top: rect.bottom + 8 + window.scrollY,
        left: rect.left + rect.width - 224,
        zIndex: 500,
      });

      return newState;
    });
  };

  const showNoTokenToast = () => {
    toast.error("No token found. Please login.", {
      style: {
        background: "#fee2e2",
        color: "#b91c1c",
        fontWeight: "bold",
      },
      icon: "📩",
    });
  };

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showNoTokenToast();
        navigate("/sign-in");
        return;
      }

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/signout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("token");
      navigate("/sign-in");
    } catch (error) {
      console.error("Signout failed:", error);
    }
  };

  const handleSignInAnother = () => navigate("/sign-in");

  const handleAccountDeletion = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showNoTokenToast();
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("User deleted successfully.");
      localStorage.removeItem("token");
      navigate("/sign-in");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user.", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role || "");
        setUserName(decoded.userName || "");
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        setUserName(res.data.fullName || "User");
      }).catch((err) => {
        console.error("Failed to fetch user:", err);
      });
    } catch (e) {
      console.error("Token decode error", e);
    }
  }, []);

  const handlers = {
    signInAnother: handleSignInAnother,
    requestHR: () => setIsDropdownOpen(false),
    toggleTheme: () => {
      setIsDark(!isDark);
      setIsDropdownOpen(false);
    },
    logout: handleSignOut,
    deleteAccount: () => {
      setShowDeleteModal(true);
      setIsDropdownOpen(false);
    },
  };

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

        <div className="relative" ref={profileRef}>
          <div className="flex items-center space-x-2 text-white cursor-pointer" onClick={toggleDropdown}>
            <img
              src={img}
              alt="Profile"
              className="h-6 w-6 mx-1 sm:h-8 sm:w-8 sm:mx-4 rounded-full object-cover"
            />
            <div className="truncate max-w-[120px] text-sm leading-tight">
              {userName || "user"}
            </div>
          </div>
        </div>
      </header>

      {/* Dropdown rendered via portal */}
      <DropdownPortal>
        <CSSTransition
          in={isDropdownOpen}
          timeout={200}
          classNames="dropdown"
          unmountOnExit
          nodeRef={dropdownRef}
        >
          <div
            ref={dropdownRef}
            style={dropdownStyle}
            className="w-56 rounded-lg shadow-lg text-sm bg-secondary"
          >
            {NavbarDropdownData.map((item, index) => {
              if (item.condition && !item.condition(role)) return null;
              const title = typeof item.title === "function" ? item.title(isDark) : item.title;
              const onClick = handlers[item.key];
              const path = item.path;

              return (
                <MainButtons
                  key={index}
                  title={title}
                  onClick={onClick}
                  path={path}
                  className={
                    item.className ||
                    "w-full text-left px-4 py-2 cursor-pointer bg-secondary hover:bg-primary text-white"
                  }
                />
              );
            })}
          </div>
        </CSSTransition>
      </DropdownPortal>

      <DeleteUserModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleAccountDeletion}
        userName={userName}
      />
    </>
  );
};

export default Navbar;
