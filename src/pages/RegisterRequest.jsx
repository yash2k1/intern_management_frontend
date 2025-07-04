import React, { useEffect, useState } from "react";
import Navbar from "../Components/Ui/Navbar";
import MainButtons from "../Components/Ui/MainButtons";
import Footer from "../Components/Ui/Footer";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const RegisterRequest = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  const fetchRequests = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/get-all-users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Filter users with status: "pending"
      const pendingUsers = res.data.users.filter(
        (user) => user.status === "pending"
      );
      setRequests(pendingUsers);
    } catch (err) {
      console.error("Failed to fetch registration requests:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const paginatedRequests = requests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAction = async (id, status) => {
    if (!token) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/hr/update-status`, // adjust this if needed
        {
          userIdToUpdate: id,
          status, // 'accepted' or 'rejected'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests((prev) => prev.filter((req) => req._id !== id));
      alert(`Request has been ${status}`);
    } catch (err) {
      console.error("Failed to handle request:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      <Navbar />

      <div className="max-w-6xl mx-auto py-6 flex-grow flex flex-col w-full px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Registration Requests</h2>
          <MainButtons
            title="← Back"
            onClick={() => window.history.back()}
            className="text-sm text-primary dark:text-white cursor-pointer hover:underline flex items-center"
          />
        </div>

        {loading ? (
          <div className="text-center py-10 text-lg">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 border">S.No.</th>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Date/Time</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRequests.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No pending registration requests found.
                    </td>
                  </tr>
                ) : (
                  paginatedRequests.map((req, index) => (
                    <tr
                      key={req._id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      <td className="px-4 py-2 border">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-2 border">{req._id}</td>
                      <td className="px-4 py-2 border">{req.fullName}</td>
                      <td className="px-4 py-2 border">{req.createdAt}</td>
                      <td className="px-4 py-2 border">{req.email}</td>
                      <td className="px-4 py-2 border flex gap-2">
                        <MainButtons
                          className="px-3 py-1 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700"
                          onClick={() => handleAction(req._id, "approved")}
                          title="Accept"
                        />
                        <MainButtons
                          className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700"
                          onClick={() => handleAction(req._id, "pending")}
                          title="Reject"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {requests.length > itemsPerPage && (
              <div className="flex justify-between items-center mt-4">
                <MainButtons
                  title="Previous"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={`px-4 py-2 bg-primary text-white rounded cursor-pointer ${
                    currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                  }`}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
                <MainButtons
                  title="Next"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className={`px-4 py-2 bg-primary text-white rounded cursor-pointer ${
                    currentPage === totalPages
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default RegisterRequest;
