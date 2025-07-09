import React, { useEffect, useState, createRef, useRef, useCallback } from "react";
import Navbar from "../Components/Ui/Navbar";
import MainButtons from "../Components/Ui/MainButtons";
import Footer from "../Components/Ui/Footer";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../AnimationStyle/UserRowAnimation.css";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState("");
  const [editingDeptId, setEditingDeptId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiLoadingMap, setApiLoadingMap] = useState({});

  // Pagination & Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const addInputRef = useRef(null);

  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.userId;
    } catch (e) {
      console.error("Failed to decode token:", e);
    }
  }

  // Manual debounce for search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1); // reset page on search
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch departments with search and pagination
  const fetchDepartments = useCallback(async () => {
    if (!token || !userId) {
      toast.error("Missing user ID. Please sign in again.", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
      });
      if (debouncedSearch.trim() !== "") {
        params.append("name", debouncedSearch.trim());
      }

      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/department?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setDepartments(res.data.departments);
        setTotalPages(res.data.totalPages || 1);
      } else {
        toast.error("Failed to fetch departments", {
          style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
          icon: "❌",
        });
      }
    } catch (err) {
      toast.error("Failed to fetch departments", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
    }
    setLoading(false);
  }, [token, userId, currentPage, debouncedSearch]);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  // Add new department - optimistic update for animation
  const handleAdd = async () => {
    if (!newDepartment.trim()) {
      return toast.error("Department name cannot be empty", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
    }
    if (apiLoadingMap.add) return;
    setApiLoadingMap((prev) => ({ ...prev, add: true }));

    const isDuplicate = departments.some(
      (dept) => dept.name.toLowerCase() === newDepartment.trim().toLowerCase()
    );
    if (isDuplicate) {
      setApiLoadingMap((prev) => ({ ...prev, add: false }));
      return toast.error("Department already exists", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/department`,
        { name: newDepartment.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
     
       if(departments.length%10==0 ){
      setTotalPages(totalPages+1);
      setCurrentPage(currentPage+1);
      }

      if (res.data.department) {
        // Optimistically add new department for animation
        setDepartments((prev) => [...prev, res.data.department]);
      } else {
        fetchDepartments();
      }
     
      setNewDepartment("");
      if (addInputRef.current) addInputRef.current.blur();
      toast.success("Department added");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add department", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
    } finally {
      setApiLoadingMap((prev) => ({ ...prev, add: false }));
    }
  };

  // Update department
  const handleUpdate = async (id) => {
    if (!editingName.trim()) {
      return toast.error("Department name cannot be empty", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
    }
    if (apiLoadingMap[id]) return;
    setApiLoadingMap((prev) => ({ ...prev, [id]: true }));

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/department/${id}`,
        { name: editingName.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingDeptId(null);
      setEditingName("");
      fetchDepartments();
      toast.success("Department updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update department", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
    } finally {
      setApiLoadingMap((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Delete department - optimistic update for animation
  const handleDelete = async (id) => {
    if (apiLoadingMap[id]) return;
    setApiLoadingMap((prev) => ({ ...prev, [id]: true }));

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/department/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("cha",departments)
         if(departments.length%10==0){
      setTotalPages(Math.max(0,totalPages-1));
      setCurrentPage(Math.max(0,currentPage-1));
       fetchDepartments();
      }
      // Optimistically remove the deleted department for animation
      setDepartments((prev) => prev.filter((d) => d._id !== id));
      toast.success("Department deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete department", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
    } finally {
      setApiLoadingMap((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      <Navbar />
      <div className="max-w-4xl mx-auto py-6 px-4 flex-grow w-full overflow-x-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Department Management</h2>
          <MainButtons
            title="← Back"
            onClick={() => window.history.back()}
            className="text-sm text-primary dark:text-white hover:underline cursor-pointer"
          />
        </div>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-800"
          />
        </div>

        {/* Add Department */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            ref={addInputRef}
            type="text"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            placeholder="Enter department name"
            className="px-3 py-2 border rounded dark:bg-gray-800 w-full"
          />
          <MainButtons
            title={apiLoadingMap.add ? "Adding..." : "Add Department"}
            onClick={handleAdd}
            disabled={apiLoadingMap.add}
            className={`px-4 py-2 rounded text-white cursor-pointer ${
              apiLoadingMap.add ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
            }`}
          />
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <table className="min-w-full border border-gray-300 dark:border-gray-700 overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <TransitionGroup component="tbody">
                {(departments.length === 0 && totalPages===1)? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      No departments found.
                    </td>
                  </tr>
                ) : (
                  departments.map((dept, idx) => {
                    const nodeRef = createRef();
                    return (
                      <CSSTransition
                        key={dept._id}
                        timeout={300}
                        classNames="slide"
                        nodeRef={nodeRef}
                      >
                        <tr
                          ref={nodeRef}
                          className="transition hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <td className="px-4 py-2 border">
                            {(currentPage - 1) * itemsPerPage + idx + 1}
                          </td>
                          <td className="px-4 py-2 border">
                            {editingDeptId === dept._id ? (
                              <input
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="p-1 border rounded dark:bg-gray-700"
                                autoFocus
                              />
                            ) : (
                              dept.name
                            )}
                          </td>
                          <td className="px-4 py-2 border flex gap-2 justify-center">
                            {editingDeptId === dept._id ? (
                              <>
                                <MainButtons
                                  title={apiLoadingMap[dept._id] ? "Saving..." : "Save"}
                                  onClick={() => handleUpdate(dept._id)}
                                  disabled={apiLoadingMap[dept._id]}
                                  className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer"
                                />
                                <MainButtons
                                  title="Cancel"
                                  onClick={() => {
                                    setEditingDeptId(null);
                                    setEditingName("");
                                  }}
                                  className="bg-gray-500 text-white px-3 py-1 rounded cursor-pointer"
                                />
                              </>
                            ) : (
                              <>
                                <MainButtons
                                  title="Edit"
                                  onClick={() => {
                                    setEditingDeptId(dept._id);
                                    setEditingName(dept.name);
                                  }}
                                  className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
                                />
                                <MainButtons
                                  title={apiLoadingMap[dept._id] ? "Deleting..." : "Delete"}
                                  onClick={() => handleDelete(dept._id)}
                                  disabled={apiLoadingMap[dept._id]}
                                  className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                                />
                              </>
                            )}
                          </td>
                        </tr>
                      </CSSTransition>
                    );
                  })
                )}
              </TransitionGroup>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <MainButtons
                  title="Previous"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded text-white cursor-pointer ${
                    currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
                  }`}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
                <MainButtons
                  title="Next"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded text-white cursor-pointer ${
                    currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-primary"
                  }`}
                />
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Departments;
