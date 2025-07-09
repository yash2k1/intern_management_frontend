import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Ui/Navbar';
import MainButtons from '../Components/Ui/MainButtons';
import Footer from '../Components/Ui/Footer';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { jwtDecode } from "jwt-decode";

const Completed = () => {
  const [interns, setInterns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const internsPerPage = 10;

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/intern/get-intern`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { status: "COMPLETED,CERTIFIED" },
          }
        );
        setInterns(res.data.interns || []);
      } catch (error) {
        toast.error("Failed to load interns");
      }
    };

    fetchInterns();
  }, []);

  const indexOfLastIntern = currentPage * internsPerPage;
  const indexOfFirstIntern = indexOfLastIntern - internsPerPage;
  const currentInterns = interns.slice(indexOfFirstIntern, indexOfLastIntern);

  const handleNext = () => {
    if (indexOfLastIntern < interns.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-text-main dark:text-white flex flex-col">
      <Navbar />

      <div className="w-full max-w-[950px] flex-grow flex flex-col items-center px-4 mb-4 mx-auto">
        <div className="flex items-center justify-between py-6 w-full">
          <h2 className="text-xl font-semibold">Completed</h2>
          <MainButtons
            title={"← Back"}
            onClick={() => window.history.back()}
            className="text-sm text-primary dark:text-white cursor-pointer hover:underline flex items-center"
          />
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full border border-border-light">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Department</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {interns.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No data available
                  </td>
                </tr>
              ) : (
                currentInterns.map((intern) => (
                  <tr
                    key={intern._id}
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    <td className="py-2 px-4 border">{intern.userId?.fullName}</td>
                    <td className="py-2 px-4 border">{intern.userId?.email}</td>
                    <td className="py-2 px-4 border">{intern.assignDepartment?.departments?intern.assignDepartment?.departments:"NA"}</td>
                    <td className="py-2 px-4 border">{intern.status}</td>
                    <td className="py-2 px-4 border">
                      <MainButtons
                        title={intern.certificateId ? 'View Certificate' : 'Issue Certificate'}
                        path={`/certificate-issue?internId=${intern._id}`}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {interns.length > 0 && (
          <div className="flex justify-between items-center mt-4 w-full max-w-[350px]">
            <MainButtons
              title={"Previous"}
              onClick={handlePrevious}
              className="bg-primary hover:bg-secondary cursor-pointer dark:bg-gray-700 text-white dark:text-white px-4 py-1 rounded disabled:opacity-50"
              disabled={currentPage === 1}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Page {currentPage} of {Math.ceil(interns.length / internsPerPage)}
            </span>
            <MainButtons
              title={"Next"}
              onClick={handleNext}
              className="bg-primary cursor-pointer hover:bg-secondary text-white dark:bg-gray-700  dark:text-white px-4 py-1 rounded disabled:opacity-50"
              disabled={indexOfLastIntern >= interns.length}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Completed;
