import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../Components/Ui/Navbar";
import MainButtons from "../Components/Ui/MainButtons";
import Footer from "../Components/Ui/Footer";

const AssignMentor = () => {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [fields, setFields] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        toast.error("User not authenticated. Please log in again.");
        return;
      }

      try {
        const [internRes, mentorRes, fieldRes] = await Promise.all([
          axios.get("http://localhost:5000/intern", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://localhost:5000/mentor", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://localhost:5000/department", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const allInterns = internRes.data.interns || [];
        const approvedInterns = allInterns.filter(
          (intern) => intern.status === "APPROVED"
        );

        setStudents(approvedInterns);
        setMentors(mentorRes.data.mentors || []);
        setFields(fieldRes.data.departments || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Error fetching data from server");
      }
    };

    fetchData();
  }, [token]);

  const handleAssign = async (id, key, value, newStatus = null) => {
    setStudents((prev) =>
      prev.map((student) =>
        student._id === id
          ? {
              ...student,
              [key]: value,
              ...(newStatus !== null && { status: newStatus }),
            }
          : student
      )
    );
  };

  const toggleStatus = async (id) => {
    const student = students.find((s) => s._id === id);
    const { assignedMentor, assignedField } = student;

    if (!assignedMentor || !assignedField) {
      return toast.error("Select both mentor and field");
    }

    try {
      await axios.put(
        "http://localhost:5000/hr/assign-mentor",
        {
          internId: id,
          mentorId: assignedMentor,
          departmentId: assignedField,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Mentor assigned successfully");

      setStudents((prev) =>
        prev.map((student) =>
          student._id === id
            ? {
                ...student,
                status: student.status === "Assigned" ? "Pending" : "Assigned",
              }
            : student
        )
      );
    } catch (err) {
      toast.error("Failed to assign mentor");
    }
  };

  const filteredStudents = students.filter((s) =>
    s.userId?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      <Navbar />
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white max-w-6xl mx-auto pb-4 flex-grow flex flex-col w-full px-4">
        <div className="p-4 sm:p-8 bg-white text-text-main">
          <div className="flex items-center justify-between pb-6">
            <h2 className="text-xl font-semibold">Mentor Assignment</h2>
            <MainButtons
              title={"← Back"}
              onClick={() => window.history.back()}
              className="text-sm text-primary dark:text-white cursor-pointer hover:underline flex items-center"
            />
          </div>
          <input
            type="text"
            placeholder="Search by student name"
            className="w-full max-w-md mb-4 px-4 py-2 border border-border-light rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="overflow-x-auto">
            <table className="w-full border border-border-light rounded-md">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="p-3 text-left">Student ID</th>
                  <th className="p-3 text-left">Student Name</th>
                  <th className="p-3 text-left">Contact No.</th>
                  <th className="p-3 text-left">Preference</th>
                  <th className="p-3 text-left">More Info</th>
                  <th className="p-3 text-left">Assign Field</th>
                  <th className="p-3 text-left">Assign Mentor</th>
                  <th className="p-3 text-left">Suggested Mentor</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="border-t border-border-light"
                  >
                    <td className="p-3">{student._id}</td>
                    <td className="p-3">{student.userId?.fullName}</td>
                    <td className="p-3">
                      {student.phoneNumber || student.mobile}
                    </td>
                    <td className="p-3">{student.preference}</td>
                    <td className="p-3">
                      <MainButtons
                        title={"View"}
                        onClick={() => navigate("/add-new-intern")}
                        className="bg-primary cursor-pointer hover:bg-secondary text-white px-3 py-1 rounded"
                      />
                    </td>
                    <td className="p-3">
                      <select
                        className="w-full p-2 border rounded focus:outline-none cursor-pointer focus:ring-2 focus:ring-secondary"
                        onChange={(e) =>
                          handleAssign(
                            student._id,
                            "assignedField",
                            e.target.value
                          )
                        }
                        value={student.assignedField || ""}
                      >
                        <option value="">Select Field</option>
                        {fields.map((field) => (
                          <option key={field._id} value={field._id}>
                            {field.departments}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      <select
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 cursor-pointer focus:ring-secondary"
                        onChange={(e) =>
                          handleAssign(
                            student._id,
                            "assignedMentor",
                            e.target.value
                          )
                        }
                        value={student.assignedMentor || ""}
                      >
                        <option value="">Select Mentor</option>
                        {mentors.map((mentor) => (
                          <option key={mentor._id} value={mentor._id}>
                            {mentor.userId?.fullName || "Mentor"}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      {student.suggestedMentor?.userId?.fullName || "N/A"}
                    </td>
                    <td>
                      <MainButtons
                        title={student.status || "Pending"}
                        onClick={() => toggleStatus(student._id)}
                        className={`p-3 font-semibold my-2 text-white text-center rounded cursor-pointer ${
                          student.status === "Assigned"
                            ? "bg-green-600"
                            : "bg-alert"
                        }`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-primary hover:bg-secondary cursor-pointer text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-primary hover:bg-secondary cursor-pointer text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AssignMentor;
