import * as React from "react";
import { useState } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import MainButtons from "./MainButtons";

export default function SignInForm({ mode }) {
  const [authMode, setAuthMode] = useState(mode);
  const [role, setRole] = useState("HR");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    // Example submission logic
    console.log(`${authMode} submitted`);
    // Add actual form validation and submission logic here
  };

  return (
    <main className="flex-1 flex justify-center items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-[500px] sm:max-w-md bg-white dark:bg-gray-800 border border-[#002147] dark:border-gray-600 rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] dark:bg-gray-700 dark:text-white"
                required
              />
              <MainButtons
                title={showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300"
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="HR"
                  checked={role === "HR"}
                  onChange={() => setRole("HR")}
                  className="accent-[#002147] dark:accent-[#F5A623]"
                />
                <span>HR</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="Mentor"
                  checked={role === "Mentor"}
                  onChange={() => setRole("Mentor")}
                  className="accent-[#002147] dark:accent-[#F5A623]"
                />
                <span>Mentor</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <MainButtons
            title={authMode === "signIn" ? "Login" : "Register"}
            onClick={handleSubmit}
            className="w-full bg-[#4A90E2] hover:bg-[#3a7fd9] text-white py-2 rounded shadow transition duration-200"
          />

          {/* Links */}
          <div className="text-sm flex flex-col sm:flex-row justify-between mt-4">
            <MainButtons
              title={authMode !== "signIn" ? "Login?" : "Register?"}
              onClick={() => setAuthMode(authMode === "signIn" ? "signUp" : "signIn")}
              className="text-black dark:text-white underline mb-2 sm:mb-0 cursor-pointer"
            />
            <MainButtons
              title={"Forgot password?"}
              path="/forgot-password"
              className="text-black dark:text-white underline cursor-pointer"
            />
          </div>
        </form>
      </div>
    </main>
  );
}
