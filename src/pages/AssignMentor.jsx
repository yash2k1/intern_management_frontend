import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Ui/Navbar';
import MainButtons from '../Components/Ui/MainButtons';
import Footer from '../Components/Ui/Footer';

const studentsData = [
  { id: 1, name: 'John Doe', contact: '1234567890', preference: 'AI & ML', status: 'Pending' },
  { id: 2, name: 'Jane Smith', contact: '9345574210', preference: 'Cybersecurity', status: 'Assigned' },
  { id: 3, name: 'yash garg', contact: '9443434433', preference: 'AI & ML', status: 'Pending' },
  { id: 4, name: 'yash garg', contact: '9443434433', preference: 'AI & ML', status: 'Pending' },
  { id: 5, name: 'palak sharma', contact: '9876543210', preference: 'Cybersecurity', status: 'Assigned' },
  { id: 6, name: 'palak sharma', contact: '9876543210', preference: 'Cybersecurity', status: 'Assigned' },
  { id: 7, name: 'palak sharma', contact: '9876543210', preference: 'Cybersecurity', status: 'Assigned' },
  { id: 8, name: 'palak sharma', contact: '9876543210', preference: 'Cybersecurity', status: 'Assigned' },
  { id: 9, name: 'palak sharma', contact: '9876543210', preference: 'Cybersecurity', status: 'Assigned' },
  { id: 10, name: 'palak sharma', contact: '9876543210', preference: 'Cybersecurity', status: 'Assigned' },
  { id: 11, name: 'palak sharma', contact: '9876543210', preference: 'Cybersecurity', status: 'Assigned' },

];

const fields = ['AI & ML', 'Cybersecurity', 'Data Science', 'IoT'];
const mentors = ['Dr. Sharma', 'Prof. Verma', 'Ms. Gupta'];

const AssignMentor = () => {
  const [students, setStudents] = useState(studentsData);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const handleAssign = (id, key, value, newStatus = null) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, [key]: value, ...(newStatus !== null && { status: newStatus }) }
          : student
      )
    );
  };

  const toggleStatus = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              status: student.status === 'Assigned' ? 'Pending' : 'Assigned',
            }
          : student
      )
    );
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);

  return (
   <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">

      <Navbar />
    <div className=" bg-white dark:bg-gray-900 text-black dark:text-white max-w-6xl mx-auto pb-4 flex-grow flex flex-col w-full  px-4">
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
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.id} className="border-t border-border-light">
                  <td className="p-3">{student.id}</td>
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.contact}</td>
                  <td className="p-3">{student.preference}</td>
                  <td className="p-3">
                    <MainButtons
                      title={"View"}
                      onClick={() => navigate('/add-new-intern')}
                      className="bg-primary cursor-pointer hover:bg-secondary text-white px-3 py-1 rounded"
                    />
                  </td>
                  <td className="p-3">
                    <select
                      className="w-full p-2 border rounded focus:outline-none cursor-pointer focus:ring-2 focus:ring-secondary"
                      onChange={(e) =>
                        handleAssign(student.id, 'assignedField', e.target.value)
                      }
                      value={student.assignedField || ''}
                    >
                      <option value="">Select Field</option>
                      {fields.map((field) => (
                        <option key={field} value={field}>
                          {field}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3">
                    <select
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 cursor-pointer focus:ring-secondary"
                      onChange={(e) =>
                        handleAssign(student.id, 'assignedMentor', e.target.value)
                      }
                      value={student.assignedMentor || ''}
                    >
                      <option value="">Select Mentor</option>
                      {mentors.map((mentor) => (
                        <option key={mentor} value={mentor}>
                          {mentor}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <MainButtons
                      title={student.status}
                      onClick={() => toggleStatus(student.id)}
                      className={`p-3 font-semibold my-2 text-white text-center rounded cursor-pointer ${student.status === 'Assigned' ? 'bg-green-600' : 'bg-alert'
                        }`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-primary hover:bg-secondary cursor-pointer text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default AssignMentor;
