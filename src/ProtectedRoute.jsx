// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";

function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 < Date.now(); // Check if expired
  } catch {
    return true;
  }
}

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    toast.error("Session expired. Please sign in again.", {
      style: {
        background: "#fee2e2", // light red
        color: "#b91c1c",      // dark red text
        fontWeight: "bold",
      },
      icon: "⏰",
    });

    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
