import { useState } from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import MainButtons from "./MainButtons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignInForm({ mode }) {
  const [role, setRole] = useState("HR");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // role
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop full‑page refresh
    console.log("✅ handleSubmit fired");
    setError("");

    const endpoint = mode === "sign-in" ? "signin" : "signup";
    const url = `${import.meta.env.VITE_API_BASE_URL}/user/${endpoint}`;
    console.log("Posting to:", url);
    console.log("Posting to:", url, { ...formData, role });
    try {
      console.log("inside try block");
      const { data } = await axios.post(
        url,
        {
          email: formData.email,
          password: formData.password,
        }

        //{ withCredentials: true }
      );
      console.log("after const",data);
      // store token or user info if your API returns one
      // if (data.token) localStorage.setItem("token", data.token);

      // ✅ redirect to homepage
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Request failed");
    }
  };

  return (
    <main className="flex-1 flex justify-center items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-[500px] sm:max-w-md bg-white dark:bg-gray-800 border border-[#002147] dark:border-gray-600 rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "sign-up" && (
            <>
              {/* Full  Name  */}
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Dr. Vikram Sarabhai"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] dark:bg-gray-700 dark:text-white"
                />
              </div>
            </>
          )}
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Password */}
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
                onChange={(e)=> setFormData({ ...formData, password: e.target.value })}
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
          <button
            type="submit"
            className="w-full bg-[#4A90E2] hover:bg-[#3a7fd9] text-white py-2 rounded shadow transition duration-200"
          >
            {mode === "sign-in" ? "Login" : "Register"}
          </button>

          {/* Links */}
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
            {mode == "sign-in" && (
              <MainButtons
                className="text-black dark:text-white underline cursor-pointer"
                path={"/change-password"}
                title={"Change password?"}
              />
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
