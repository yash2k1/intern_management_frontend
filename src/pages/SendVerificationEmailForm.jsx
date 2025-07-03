import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import MainButtons from "../Components/Ui/MainButtons";
import axios from "axios";

export default function SendVerificationEmailForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading || !email) return;

        setLoading(true);

        try {
            const url = `${import.meta.env.VITE_API_BASE_URL}/user/send-verification-email`;
            const { data } = await axios.post(url, { email });

            localStorage.setItem("verify_user_id", data.user._Id);
            toast.success("Verification email sent! Please check your inbox.");
            navigate("/verify-email");
        } catch (err) {
            const message = err?.response?.data?.message || "Failed to send verification email";
            toast.error(message, {
                style: {
                    background: "#fee2e2",
                    color: "#b91c1c",
                    fontWeight: "bold",
                },
                icon: "📩",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className=" flex justify-center items-center px-4 py-8 sm:px-6 lg:px-8 min-h-svh">
            <div className="w-full max-w-[500px] sm:max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  

                        <h2 className="text-2xl font-bold text-center text-gray-800 my-4 dark:text-white">
                            Enter your email to verify
                        </h2>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#4A90E2] dark:bg-gray-700 dark:text-white"
                        />
                   

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded shadow transition duration-200 cursor-pointer ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#4A90E2] hover:bg-[#3a7fd9] text-white"
                            }`}
                    >
                        {loading ? "Sending OTP..." : "Send Verification Email"}
                    </button>

                    <div className="text-sm mt-4 flex justify-center">
                        <MainButtons
                            title="Back to login?"
                            path="/sign-in"
                            className="text-black dark:text-white underline cursor-pointer"
                        />
                    </div>
                </form>
            </div>
        </main>
    );
}
