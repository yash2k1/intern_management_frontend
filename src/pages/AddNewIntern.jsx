import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';

const MentorAssignmentSection = ({ internId }) => {
  const [mentorList, setMentorList] = useState([]);
  const [fieldList, setFieldList] = useState([]);
  const [selectedMentorId, setSelectedMentorId] = useState('');
  const [selectedFieldId, setSelectedFieldId] = useState('');
  const [assignmentStatus, setAssignmentStatus] = useState('PENDING');
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchMentorsAndFields = async () => {
      try {
        const mentorRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/mentor`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMentorList(mentorRes.data);

        const fieldRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/department`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFieldList(fieldRes.data);

        const mentorOfIntern = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/mentor/intern/${internId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (mentorOfIntern.data.assigned) {
          setAssignmentStatus('ASSIGNED');
        }
      } catch (err) {
        console.error('Failed to load mentors or fields:', err);
      }
    };

    fetchMentorsAndFields();
  }, [internId, token]);

  const handleAssignment = async () => {
    try {
      if (!selectedMentorId || !selectedFieldId) {
        return toast.error("Select both mentor and field");
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/mentor/assign`,
        { internId, mentorId: selectedMentorId, fieldId: selectedFieldId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        toast.success('Mentor assigned successfully');
        setAssignmentStatus('ASSIGNED');
      }
    } catch (err) {
      console.error(err);
      toast.error('Assignment failed');
    }
  };

  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
      <select
        value={selectedMentorId}
        onChange={(e) => setSelectedMentorId(e.target.value)}
        className="border p-2 rounded w-full sm:w-auto"
      >
        <option value="">Select Mentor</option>
        {mentorList.map((mentor) => (
          <option key={mentor._id} value={mentor._id}>
            {mentor.name || mentor.fullName}
          </option>
        ))}
      </select>

      <select
        value={selectedFieldId}
        onChange={(e) => setSelectedFieldId(e.target.value)}
        className="border p-2 rounded w-full sm:w-auto"
      >
        <option value="">Select Field</option>
        {fieldList.map((field) => (
          <option key={field._id} value={field._id}>
            {field.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleAssignment}
        disabled={assignmentStatus === 'ASSIGNED'}
        className={`px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all ${
          assignmentStatus === 'ASSIGNED'
            ? 'bg-green-500 text-white'
            : 'bg-yellow-500 text-white hover:bg-yellow-600'
        }`}
      >
        {assignmentStatus === 'ASSIGNED' ? 'Assigned' : 'Pending'}
      </button>
    </div>
  );
};

export default MentorAssignmentSection;
