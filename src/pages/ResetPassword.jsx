import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OTPInputBox from "../Components/Ui/OTPInputBox";
import axios from "axios";
import { toast } from "react-hot-toast";
import {jwtDecode} from "jwt-decode";

const ResetPassword = () => {
  const [passwordValues, setPasswordValues] = useState({
    new_otp1: "",
    new_otp2: "",
    new_otp3: "",
    new_otp4: "",
    new_otp5: "",
    new_otp6: "",
  });

  const [confirmValues, setConfirmValues] = useState({
    confirm_otp1: "",
    confirm_otp2: "",
    confirm_otp3: "",
    confirm_otp4: "",
    confirm_otp5: "",
    confirm_otp6: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Reset token missing or invalid.", {
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          fontWeight: "bold",
        },
      });
      navigate("/sign-in");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setEmail(decoded.email); // assuming email is stored in token payload
    } catch (err) {
      toast.error("Invalid token format.", {
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          fontWeight: "bold",
        },
      });
    }
  }, [token, navigate]);

  const handleValueChange = (id, value, target) => {
    const update = target === "confirm" ? { ...confirmValues } : { ...passwordValues };
    update[id] = value;

    if (target === "confirm") {
      setConfirmValues(update);
    } else {
      setPasswordValues(update);
    }
  };

  const handleSubmit = async () => {
    const newPassword = Object.values(passwordValues).join("");
    const confirmPassword = Object.values(confirmValues).join("");

    if (newPassword.length !== 6 || confirmPassword.length !== 6) {
      return toast.error("Password must be 6 digits long", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
    }

    try {
      setLoading(true);
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/user/reset-password/${token}`,
        { newPassword }
      );
      toast.success("Password reset successful");
      setTimeout(() => navigate("/sign-in"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  };

  const resendToken = async () => {
    if (!email) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/forgot-password`, {
        email,
      });
      toast.success("Reset token resent to your email.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Resend failed.", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="bg-white dark:bg-gray-800 py-6 px-1 sm:p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800 dark:text-white">
          Reset Your Password
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
          Enter your new password (6 digits)
        </p>

        {/* New Password Section */}
        <div className="flex justify-center flex-col align-middle w-fit mx-auto">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            New Password
          </label>
          <div className="block mb-4">
            {Object.keys(passwordValues).map((id, idx, arr) => (
              <OTPInputBox
                key={id}
                id={id}
                previousId={arr[idx - 1]}
                nextId={arr[idx + 1]}
                value={passwordValues[id]}
                onValueChange={(id, value) => handleValueChange(id, value, "password")}
                handleSubmit={handleSubmit}
              />
            ))}
          </div>
        </div>

        {/* Confirm Password Section */}
        <div className="flex justify-center flex-col align-middle w-fit mx-auto">
          <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm New Password
          </label>
          <div className="block mb-4">
            {Object.keys(confirmValues).map((id, idx, arr) => (
              <OTPInputBox
                key={id}
                id={id}
                previousId={arr[idx - 1]}
                nextId={arr[idx + 1]}
                value={confirmValues[id]}
                onValueChange={(id, value) => handleValueChange(id, value, "confirm")}
                handleSubmit={handleSubmit}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 w-[80%] block mx-auto cursor-pointer text-white font-semibold py-2 rounded"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
          Didn’t get the link?{" "}
          <button
            type="button"
            onClick={resendToken}
            className="text-blue-600 underline hover:text-blue-800 font-medium cursor-pointer"
          >
            Resend Token
          </button>
        </p>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("✅")
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
