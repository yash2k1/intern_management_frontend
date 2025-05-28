import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Ui/Navbar';

const studentsData = [
  {
    id: 1,
    name: 'John Doe',
    contact: '1234567890',
    preference: 'AI & ML',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Jane Smith',
    contact: '9345574210',
    preference: 'Cybersecurity',
    status: 'Assigned',
  },
  {
    id: 3,
    name: 'yash garg',
    contact: '9443434433',
    preference: 'AI & ML',
    status: 'Pending',
  },
  {
    id: 4,
    name: 'palak sharma',
    contact: '9876543210',
    preference: 'Cybersecurity',
    status: 'Assigned',
  },
];

const fields = ['AI & ML', 'Cybersecurity', 'Data Science', 'IoT'];
const mentors = ['Dr. Sharma', 'Prof. Verma', 'Ms. Gupta'];
const AssignMentor = () => {
  const [students, setStudents] = useState(studentsData);
  const [search, setSearch] = useState('');
const navigate= useNavigate();

  const handleAssign = (id, key, value, newStatus = null) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              [key]: value,
              ...(newStatus !== null && { status: newStatus }),
            }
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

  return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
     <Navbar />
    <div className="p-4 sm:p-8 bg-white text-text-main">
      <h2 className="text-2xl font-bold text-primary mb-6">Mentor Assignment</h2>

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
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-t border-border-light">
                <td className="p-3">{student.id}</td>
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.contact}</td>
                <td className="p-3">{student.preference}</td>
                <td className="p-3">
                  <button className="bg-primary cursor-pointer hover:bg-secondary text-white px-3 py-1 rounded" onClick={()=>navigate('/add-intern')}>
                    View
                  </button>
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
                <div
                  className={`p-3 font-semibold my-2 text-white text-center rounded cursor-pointer ${
                    student.status === 'Assigned' ? 'bg-green-600' : 'bg-alert'
                  }`}
                  onClick={() => toggleStatus(student.id)}
                >
                  {student.status}
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AssignMentor;
