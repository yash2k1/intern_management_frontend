import React, { useState, useEffect } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import {jwtDecode} from "jwt-decode";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toastErrorStyle = {
    background: "#fee2e2",
    color: "#b91c1c",
    fontWeight: "bold",
  };

  const getUserIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const decoded = jwtDecode(token);
      return decoded?.userId || null;
    } catch (error) {
      return null;
    }
  };

  const userId = getUserIdFromToken();

  // If userId is missing, show error and redirect
  useEffect(() => {
    if (!userId) {
      toast.error("You have to login again", {
        style: toastErrorStyle,
        icon: "❌",
      });
      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    }
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) return; // Already handled by useEffect

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.", {
        style: toastErrorStyle,
        icon: "❌",
      });
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You have to login again", {
          style: toastErrorStyle,
          icon: "❌",
        });
        navigate("/sign-in");
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/user/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message || "Password changed successfully.");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => navigate("/sign-in"), 1500);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || error.response?.data?.error || "An error occurred. Please try again.",
        {
          style: toastErrorStyle,
          icon: "❌",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex justify-center items-center px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
      <div className="w-full max-w-[500px] sm:max-w-md bg-white dark:bg-gray-800 border border-[#002147] dark:border-gray-600 rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#002147] dark:text-white">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Old Password */}
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                id="oldPassword"
                type={showPassword.oldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] dark:bg-gray-700 dark:text-white"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    newPassword: false,
                    confirmPassword: false,
                    oldPassword: !showPassword.oldPassword,
                  })
                }
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300"
                aria-label={showPassword.oldPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword.oldPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPassword.newPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] dark:bg-gray-700 dark:text-white"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    oldPassword: false,
                    confirmPassword: false,
                    newPassword: !showPassword.newPassword,
                  })
                }
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300"
                aria-label={showPassword.newPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword.newPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword.confirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] dark:bg-gray-700 dark:text-white"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    oldPassword: false,
                    newPassword: false,
                    confirmPassword: !showPassword.confirmPassword,
                  })
                }
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300"
                aria-label={showPassword.confirmPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword.confirmPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#4A90E2] hover:bg-[#3a7fd9] cursor-pointer text-white py-2 rounded shadow transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

          {/* Back to Login */}
          <div
            className="text-sm text-center underline text-black dark:text-white cursor-pointer mt-4"
            onClick={() => navigate("/sign-in")}
          >
            Back to Login
          </div>
        </form>
      </div>
    </main>
  );
};

export default ChangePassword;
