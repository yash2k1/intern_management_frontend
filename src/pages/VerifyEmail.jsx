import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OTPInputBox from "../Components/Ui/OTPInputBox";
import axios from "axios";
import { toast } from "react-hot-toast";

const VerifyEmail = () => {
  const [otpValues, setOtpValues] = useState({
    otp1: "", otp2: "", otp3: "", otp4: "", otp5: "", otp6: "",
  });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const urlUserId = queryParams.get("userId");
  const urlOtp = queryParams.get("otp");

  useEffect(() => {
    const storedUserId = localStorage.getItem("verify_user_id");

    if (urlUserId && urlOtp) {
      autoVerify(urlUserId, urlOtp);
    } else if (urlUserId) {
      setUserId(urlUserId);
    } else if (storedUserId) {
      setUserId(storedUserId);
    } else {
      toast.error("Missing user ID. Please sign in again.", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
      navigate("/sign-in", { replace: true });
    }
  }, []);


  const autoVerify = async (id, otp) => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/verify-email`,
        { userId: id, otp }
      );
      toast.success("✅ Email verified successfully!");
      localStorage.removeItem("verify_user_id");
      if (otp.length === 6) {
        setOtpValues({
          otp1: otp[0],
          otp2: otp[1],
          otp3: otp[2],
          otp4: otp[3],
          otp5: otp[4],
          otp6: otp[5],
        });
      }
      setTimeout(() => navigate("/sign-in"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || " Auto-verification failed.", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleValueChange = (id, value) => {
    const newOtp = { ...otpValues };
    const keys = Object.keys(newOtp);

    const currentIndex = keys.indexOf(id);
    const firstEmptyIndex = keys.findIndex(
      (key, idx) => idx <= currentIndex && newOtp[key] === ""
    );

    if (firstEmptyIndex !== -1) {
      newOtp[keys[firstEmptyIndex]] = value;
    } else {
      newOtp[id] = value;
    }
    setOtpValues(newOtp);
  };

  const handleSubmit = async () => {
    const otp = Object.values(otpValues).join("");

    if (!userId) {
      toast.error("User ID not found.", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
      return;
    }

    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits.", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/verify-email`,
        { userId, otp }
      );
      toast.success("✅ Email verified successfully!");
      localStorage.removeItem("verify_user_id");
      setTimeout(() => navigate("/sign-in"), 1500);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed.", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
      setLoading(false);
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
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800 dark:text-white">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
          Enter the 6-digit code sent to your email
        </p>





        <div className="flex justify-center mb-4">
          {["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"].map((id, idx, arr) => (
            <OTPInputBox
              key={id}
              id={id}
              previousId={arr[idx - 1]}
              nextId={arr[idx + 1]}
              value={otpValues[id]}
              onValueChange={handleValueChange}
              handleSubmit={handleSubmit}
            />
          ))}
        </div>
        {
          loading ? (<button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded cursor-not-allowed"
          >
            Verifying...
          </button>) : (<button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded cursor-pointer"
          >
            Verify
          </button>)
        }



      </form>
    </div>
  );
};

export default VerifyEmail;
