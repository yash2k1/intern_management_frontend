import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../Components/Ui/Navbar";
import RejectedPopUp from "../Components/modals/RejectedPopUp";
import ApprovedPopUp from "../Components/modals/ApprovedPopUp";
import MainButtons from "../Components/Ui/MainButtons";
import Footer from "../Components/Ui/Footer";

const AssignInterns = () => {
  const [interns, setInterns] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const token = localStorage.getItem("token");

  // Central refetch trigger
  const [reload, setReload] = useState(false);

  const fetchData = async () => {
    if (!token) {
      toast.error("User not authenticated. Please log in again.");
      return;
    }

    try {
      const [internRes, mentorRes] = await Promise.all([
        axios.get("http://localhost:5000/mentor/requested-interns", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get("http://localhost:5000/mentor", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);
      console.log("internRes", internRes);
      console.log("internRes.data.interns", internRes.data.interns);
      setInterns(internRes.data.requestedInterns);
      setMentors(mentorRes.data.mentors);
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Error fetching data from server");
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, reload]);
  console.log("interns", interns);

  const handleApprovedClick = (student) => {
    setSelectedStudent(student);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedStudent(null);
  };

  const handleRejectClick = (student) => {
    setSelectedStudent(student);
    setIsRejectPopupOpen(true);
  };

  const handleRejectConfirm = ({ remark, suggestedMentor }) => {
    // Example reject handling
    toast("Rejected with remark: " + remark);
    setIsRejectPopupOpen(false);
    setReload((prev) => !prev);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInterns = interns.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(interns.length / itemsPerPage);
  console.log("currentInterns", currentInterns);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-text-main dark:text-white flex flex-col">
      <Navbar />

      <div className="w-full flex flex-grow mb-4 items-center flex-col px-4">
        <div className="w-full max-w-[950px]">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-xl font-semibold">Intern Details</h2>
            <MainButtons
              title={"← Back"}
              onClick={() => window.history.back()}
              className="text-sm text-primary dark:text-white cursor-pointer hover:underline flex items-center"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-border-light">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                  <th className="py-2 px-4 border border-border-light">Name</th>
                  <th className="py-2 px-4 border border-border-light">
                    Email
                  </th>
                  <th className="py-2 px-4 border border-border-light">
                    Department
                  </th>
                  <th className="py-2 px-4 border border-border-light">
                    Status
                  </th>
                  <th className="py-2 px-4 border border-border-light">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {interns.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4 text-gray-500 dark:text-gray-400"
                    >
                      Loading data...
                    </td>
                  </tr>
                ) : (
                  currentInterns.map((intern) => (
                    <tr
                      key={intern._id}
                      className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                      <td className="py-2 px-4 border border-border-light">
                        {intern.userId?.fullName}
                      </td>
                      <td className="py-2 px-4 border border-border-light">
                        {intern.userId?.email}
                      </td>
                      <td className="py-2 px-4 border border-border-light">
                        {intern.assignDepartment?.department}
                      </td>
                      <td className="py-2 px-4 border border-border-light">
                        {intern.status}
                      </td>
                      <td className="py-2 px-4 border border-border-light">
                        <div className="flex flex-wrap gap-2">
                          <MainButtons
                            title={"Approve"}
                            onClick={() => handleApprovedClick(intern)}
                            className="bg-green-600 hover:bg-green-700 cursor-pointer text-white text-sm px-4 py-1 rounded-full"
                          />
                          <MainButtons
                            title={"Reject"}
                            onClick={() => handleRejectClick(intern)}
                            className="bg-red-600 hover:bg-red-700 cursor-pointer text-white text-sm px-4 py-1 rounded-full"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {interns.length > itemsPerPage && (
              <div className="flex justify-between items-center mt-4">
                <MainButtons
                  title={"Previous"}
                  className="px-4 py-2 cursor-pointer bg-secondary text-white rounded disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                />
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <MainButtons
                  title={"Next"}
                  className="px-4 py-2 cursor-pointer bg-secondary text-white rounded disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <ApprovedPopUp
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        student={selectedStudent}
      />
      <RejectedPopUp
        isOpen={isRejectPopupOpen}
        onClose={() => setIsRejectPopupOpen(false)}
        onConfirm={handleRejectConfirm}
        student={selectedStudent}
        mentors={mentors}
      />
      <Footer />
    </div>
  );
};

export default AssignInterns;
