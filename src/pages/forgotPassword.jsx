import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainButtons from "../Components/Ui/MainButtons";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e?.preventDefault(); // ✅ Safely handle event if it's passed

    if (email.trim() === "") {
      return setMessage("Please enter a valid email address.");
    }

    try {
      // ✅ Simulated API call
      setMessage("A password reset link has been sent to your email.");
      
      // Optionally simulate delay (remove in real code)
      setTimeout(() => {
        navigate("/verify-mail");
      }, 1000);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <main className="flex-1 flex justify-center items-center px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
      <div className="w-full max-w-[500px] sm:max-w-md bg-white dark:bg-gray-800 border border-[#002147] dark:border-gray-600 rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#002147] dark:text-white">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Enter your registered email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <MainButtons
            type="submit"
            title="Send Reset Link"
            onClick={(e) => handleSubmit(e)}
            className="w-full bg-[#4A90E2] hover:bg-[#3a7fd9] cursor-pointer text-white py-2 rounded shadow transition duration-200"
          />

          {message && (
            <p className="text-sm mt-2 text-center text-green-600 dark:text-green-400">
              {message}
            </p>
          )}

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

export default ForgotPassword;
