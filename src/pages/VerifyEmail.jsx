import React, { useState } from "react";
import OTPInputBox from "../Components/Ui/OTPInputBox";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const [otpValues, setOtpValues] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });

  const [message, setMessage] = useState("");

  const handleValueChange = (id, value) => {
    const newOtp = { ...otpValues };
    const keys = Object.keys(newOtp);

    // Find the first empty key from left to current index
    const currentIndex = keys.indexOf(id);
    const firstEmptyIndex = keys.findIndex(
      (key, idx) => idx <= currentIndex && newOtp[key] === ""
    );

    if (firstEmptyIndex !== -1) {
      const emptyKey = keys[firstEmptyIndex];
      newOtp[emptyKey] = value;
      setOtpValues(newOtp);
    } else {
      // fallback to current id
      newOtp[id] = value;
      setOtpValues(newOtp);
    }
  };

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const otp = Object.values(otpValues).join("");

    if (otp.length !== 6) {
      setMessage("Please enter all 6 digits.");
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("userId");

    if (!userId) {
      setMessage("Missing user ID in URL.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/signup`,
        {
          userId,
          otp,
        }
      );

      setMessage("✅ Email verified successfully!");
      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    } catch (error) {
      console.error("Verification failed:", error);
      setMessage(error.response?.data?.message || "Verification failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        id="OTPInputGroup"
        data-autosubmit="true"
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <div className="flex justify-center mb-4">
          {["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"].map(
            (id, idx, arr) => (
              <OTPInputBox
                key={id}
                id={id}
                previousId={arr[idx - 1]}
                nextId={arr[idx + 1]}
                value={otpValues[id]}
                onValueChange={handleValueChange}
                handleSubmit={handleSubmit}
              />
            )
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Verify
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-green-600 dark:text-green-400">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default VerifyEmail;
