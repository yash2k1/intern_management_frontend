import { useState } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import MainButtons from "./MainButtons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignInForm({ mode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "HR",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const endpoint = mode === "sign-in" ? "signin" : "signup";
    const url = `${import.meta.env.VITE_API_BASE_URL}/user/${endpoint}`;

    try {
      const { data } = await axios.post(url, {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        roleRequested: formData.role,
      });

      if (mode === "sign-up") {
        localStorage.setItem("verify_user_id", data.user._id);
        toast.success("Signup successful! Please verify your email.");
        navigate("/verify-email");
      } else {
        localStorage.setItem("token", data.token);
        toast.success("Login successful!");
        navigate("/", { replace: true });
      }
    } catch (err) {
      const message = err?.response?.data?.message || "Request failed";
      toast.error(message, {
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          fontWeight: "bold",
        },
        icon: "⏰",
      });
    } finally {
      setFormData({
        email: "",
        password: "",
        name: "",
        role: "HR",
      });
        email: "",
        password: "",
        name: "",
        role: "HR",
      });
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex justify-center items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-[500px] sm:max-w-md bg-white dark:bg-gray-800 border border-[#002147] dark:border-gray-600 rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "sign-up" && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Dr. Vikram Sarabhai"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] dark:bg-gray-700 dark:text-white"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] dark:bg-gray-700 dark:text-white"
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

          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <div className="flex flex-col sm:flex-row gap-4">
              {["HR", "MENTOR", "INTERN"].map((role) => (
                <label key={role} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={() => setFormData({ ...formData, role })}
                    className="accent-[#002147] dark:accent-[#F5A623]"
                  />
                  <span>{role}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded shadow transition duration-200 cursor-pointer ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#4A90E2] hover:bg-[#3a7fd9] text-white"
            }`}
          >
            {loading
              ? mode === "sign-in"
                ? "Logging in..."
                : "Registering..."
              : mode === "sign-in"
              ? "Login"
              : "Register"}
          </button>

          <div className="text-sm flex flex-col sm:flex-row justify-between mt-4 gap-2">
            <MainButtons
              className="text-black dark:text-white underline cursor-pointer"
              onClick={() =>
                navigate(`/${mode !== "sign-in" ? "sign-in" : "sign-up"}`)
              }
              title={`${mode !== "sign-in" ? "Login" : "Register"}?`}
            />
            <MainButtons
              className="text-black dark:text-white underline cursor-pointer"
              path={"/forgot-password"}
              title={"Forgot password?"}
            />
                <MainButtons
              className="text-black dark:text-white underline cursor-pointer"
              path={"/send-verify-email"}
              title={"Email verification?"}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
