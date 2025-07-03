import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-hot-toast';
import Navbar from '../Components/Ui/Navbar';
import Footer from '../Components/Ui/Footer';

const MyProfile = () => {
  const [internData, setInternData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error("No token found. Please login.", {
          style: {
            background: "#fee2e2",
            color: "#b91c1c",
            fontWeight: "bold",
          },
          icon: "📩",
        });
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/intern/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInternData(data.intern);
        toast.success("Profile loaded successfully");
      } catch (error) {
        const message =
          error?.response?.data?.message || "Failed to load profile";
        toast.error(message, {
          style: {
            background: "#fee2e2",
            color: "#b91c1c",
            fontWeight: "bold",
          },
          icon: "📩",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!internData){
      return (
    <>
           <Navbar />
           <div className="max-w-4xl mx-auto px-4 py-8 grid items-center flex-grow flex-col">
            <p className="text-center mt-10">No profile data found.</p>
           </div>
           <Footer />
       </>
       );
  } 

  const { userId, assignDepartment, mentorId, semId, remark } = internData;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">📋 My Profile</h2>

        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <div><strong>Full Name:</strong> {userId?.fullName}</div>
          <div><strong>Email:</strong> {userId?.email}</div>
          <div>
            <strong>Status:</strong>{' '}
            <span
              className={`font-bold ${
                userId?.status === 'APPROVED'
                  ? 'text-green-600'
                  : userId?.status === 'REJECTED'
                  ? 'text-red-600'
                  : 'text-yellow-600'
              }`}
            >
              {userId?.status}
            </span>
          </div>
          <div><strong>Department:</strong> {assignDepartment?.departments || 'N/A'}</div>
          <div><strong>Mentor:</strong> {mentorId?.userId?.fullName || 'Not Assigned'}</div>
          <div><strong>Current Semester:</strong> {semId?.currentSemester || 'N/A'}</div>
          <div><strong>Remarks:</strong> {remark || 'None'}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyProfile;
