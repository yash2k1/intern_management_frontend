import React, { useEffect, useState, createRef } from "react";
import Navbar from "../Components/Ui/Navbar";
import MainButtons from "../Components/Ui/MainButtons";
import Footer from "../Components/Ui/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../UserRowAnimation.css";

const InternRegistration = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [buttonLoadingMap, setButtonLoadingMap] = useState({});

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...(searchTerm && { name: searchTerm }),
        ...(filter !== "All" && { role: filter }),
      });

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/intern/get-all-users-and-intern?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error("Failed to load users", {
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          fontWeight: "bold",
        },
        icon: "📩",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm, filter]);

  const setUserButtonLoading = (userId, state) => {
    setButtonLoadingMap((prev) => ({ ...prev, [userId]: state }));
  };

  const sendInternForm = async (userId) => {
    if (buttonLoadingMap[userId]) return;
    setUserButtonLoading(userId, true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/intern/send-fill-form`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "Fill form email sent");
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to send intern form";
      toast.error(message, {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "📩",
      });
    } finally {
      setUserButtonLoading(userId, false);
    }
  };

  const sendUpdateForm = async (userId) => {
    if (buttonLoadingMap[userId]) return;
    setUserButtonLoading(userId, true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/intern/send-fill-form`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "Update form email sent");
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to send update form";
      toast.error(message, {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "📩",
      });
    } finally {
      setUserButtonLoading(userId, false);
    }
  };

  const sendAcceptance = async (userId) => {
    if (buttonLoadingMap[userId]) return;
    setUserButtonLoading(userId, true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/intern/send-acceptance`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "Acceptance email sent");
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to send acceptance email";
      toast.error(message, {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "📩",
      });
    } finally {
      setUserButtonLoading(userId, false);
    }
  };

  const sendRejection = async (userId) => {
    if (buttonLoadingMap[userId]) return;
    setUserButtonLoading(userId, true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/intern/send-rejection`,
        { userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "Rejection email sent");
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to send rejection email";
      toast.error(message, {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "📩",
      });
    } finally {
      setUserButtonLoading(userId, false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      <Navbar />
      <div className="max-w-6xl mx-auto py-6 flex-grow flex flex-col w-full px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Intern Registration Requests</h2>
          <MainButtons
            title="← Back"
            onClick={() => window.history.back()}
            className="text-sm text-primary dark:text-white cursor-pointer hover:underline flex items-center"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 w-full">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full sm:flex-1 px-3 py-2 border rounded dark:bg-gray-800"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="w-full sm:w-48 px-3 py-2 border rounded dark:bg-gray-800"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All</option>
            <option value="USER">USER</option>
            <option value="INTERN">INTERN</option>
          </select>
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
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Role</th>
                  <th className="px-4 py-2 border">More Info</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <TransitionGroup component="tbody">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => {
                    const nodeRef = createRef();
                    return (
                      <CSSTransition key={user._id} timeout={300} classNames="slide" nodeRef={nodeRef}>
                        <tr ref={nodeRef} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                          <td className="px-4 py-2 border">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td className="px-4 py-2 border">{user._id}</td>
                          <td className="px-4 py-2 border">{user.fullName}</td>
                          <td className="px-4 py-2 border">{user.email}</td>
                          <td className="px-4 py-2 border">{user.role}</td>
                          <td className="px-4 py-2 border text-center">
                            <MainButtons
                              title="View"
                              onClick={() => navigate(`/View-intern-or-user-info?userId=${user._id}&role=${user.role}`)}
                            />
                          </td>
                          <td className="px-4 py-2 border space-y-2">
                            {user.role === "USER" && (
                              <MainButtons
                                title={buttonLoadingMap[user._id] ? "Sending..." : "Send Intern Form"}
                                disabled={buttonLoadingMap[user._id]}
                                onClick={() => sendInternForm(user._id)}
                                className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium shadow-md block mx-auto whitespace-nowrap transition-all ${
                                  buttonLoadingMap[user._id]
                                    ? "bg-gray-400 cursor-not-allowed text-gray-700"
                                    : "bg-secondary text-white hover:bg-primary dark:hover:bg-primary"
                                }`}
                              />
                            )}

                            {user.role === "INTERN" && (
                              buttonLoadingMap[user._id] ? (
                                <div className="flex justify-center items-center">
                                  <MainButtons
                                    title={"Requesting..."}
                                    disabled
                                    onClick={() => toast.success("Intern approved")}
                                    className="bg-gray-400 px-4 py-2 cursor-not-allowed text-gray-700 rounded-full text-sm font-medium shadow-md transition-all"
                                  />
                                </div>
                              ) : (
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <MainButtons
                                    title="Approve"
                                    onClick={() => sendAcceptance(user._id)}
                                    className="cursor-pointer px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all bg-green-600 text-white hover:bg-green-700"
                                  />
                                  <MainButtons
                                    title="Reject"
                                    onClick={() => sendRejection(user._id)}
                                    className="cursor-pointer px-4 py-2 rounded-full text-sm text-white font-medium shadow-md transition-all bg-red-600 hover:bg-red-700"
                                  />
                                  <MainButtons
                                    title="Update"
                                    onClick={() => sendUpdateForm(user._id)}
                                    className="cursor-pointer px-4 py-2 rounded-full text-sm text-white font-medium shadow-md transition-all bg-yellow-500 hover:bg-yellow-600"
                                  />
                                </div>
                              )
                            )}
                          </td>
                        </tr>
                      </CSSTransition>
                    );
                  })
                )}
              </TransitionGroup>
            </table>

            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <MainButtons
                  title="Previous"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={`px-4 py-2 bg-primary text-white rounded cursor-pointer ${
                    currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                  }`}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
                <MainButtons
                  title="Next"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className={`px-4 py-2 mb-4 bg-primary text-white rounded cursor-pointer ${
                    currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
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

export default InternRegistration;
