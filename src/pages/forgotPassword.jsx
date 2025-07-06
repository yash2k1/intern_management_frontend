import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainButtons from "../Components/Ui/MainButtons";
import axios from "axios";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // <-- loading state added
  const navigate = useNavigate();

  const toastErrorStyle = {
    background: "#fee2e2",
    color: "#b91c1c",
    fontWeight: "bold",
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (email.trim() === "") {
      return toast.error("Please enter a valid email address.", {
        style: toastErrorStyle,
      });
    }

    try {
      setLoading(true); // start loading before API call
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/forgot-password`,
        { email }
      );

      toast.success(data.message || "Password reset link sent!");

      setEmail("");
      setTimeout(() => {
        navigate("/sign-in");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again.",
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
            title={loading ? "Sending..." : "Send Reset Link"}
            onClick={(e) => handleSubmit(e)}
            disabled={loading}  // <-- disable button when loading
            className={`w-full bg-[#4A90E2] hover:bg-[#3a7fd9] cursor-pointer text-white py-2 rounded shadow transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          />

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
