import React, { useState } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";


const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    // TODO: Replace with your API logic
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    alert("Password changed successfully.");
    navigate("/sign-in");
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
            <input
              id="oldPassword"
              type={showPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] dark:bg-gray-700 dark:text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#4A90E2] hover:bg-[#3a7fd9] cursor-pointer text-white py-2 rounded shadow transition duration-200"
          >
            Update Password
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
