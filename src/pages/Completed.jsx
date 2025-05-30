import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Ui/Navbar';
import MainButtons from '../Components/Ui/MainButtons';
import Footer from '../Components/Ui/Footer';

const Completed = () => {
  // Simulated API data
  const fakeApiData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering', status: 'Pending' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Marketing', status: 'Pending' },
    { id: 3, name: 'Alex Johnson', email: 'alex@example.com', department: 'Finance', status: 'Pending' },
    { id: 4, name: 'Priya Patel', email: 'priya@example.com', department: 'HR', status: 'Pending' },
    { id: 5, name: 'Rahul Verma', email: 'rahul@example.com', department: 'Design', status: 'Pending' },
    { id: 6, name: 'Anjali Singh', email: 'anjali@example.com', department: 'IT', status: 'Pending' },
    { id: 7, name: 'Ravi Kumar', email: 'ravi@example.com', department: 'Admin', status: 'Pending' },
    { id: 8, name: 'Sunita Yadav', email: 'sunita@example.com', department: 'Finance', status: 'Pending' },
    { id: 9, name: 'Aman Gupta', email: 'aman@example.com', department: 'Design', status: 'Pending' },
    { id: 10, name: 'Meena Rawat', email: 'meena@example.com', department: 'Operations', status: 'Pending' },
    { id: 11, name: 'Sameer Khan', email: 'sameer@example.com', department: 'Support', status: 'Pending' },
  ];

  const [interns, setInterns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const internsPerPage = 10;

  useEffect(() => {
    setTimeout(() => {
      setInterns(fakeApiData);
    }, 500);
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
                    Loading data...
                  </td>
                </tr>
              ) : (
                currentInterns.map((intern) => (
                  <tr
                    key={intern.id}
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    <td className="py-2 px-4 border">{intern.name}</td>
                    <td className="py-2 px-4 border">{intern.email}</td>
                    <td className="py-2 px-4 border">{intern.department}</td>
                    <td className="py-2 px-4 border">{intern.status}</td>
                    <td className="py-2 px-4 border">
                      {/* Example action button, adjust as needed */}
                      <MainButtons title="View" onClick={() => alert(`Viewing ${intern.name}`)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

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
      </div>

      <Footer />
    </div>
  );
};

export default Completed;
