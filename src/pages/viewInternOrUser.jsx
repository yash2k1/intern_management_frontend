import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Ui/Navbar";
import Footer from "../Components/Ui/Footer";
import { Cross2Icon } from '@radix-ui/react-icons';
const ViewInternOrUser = () => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [internData, setInternData] = useState(null);
  const [academics, setAcademics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popupImage, setPopupImage] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("userId");
    const r = params.get("role");

    if (!id || !r || !["USER", "INTERN"].includes(r.toUpperCase())) {
      window.history.back();
      return;
    }

    setUserId(id);
    setRole(r.toUpperCase());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/intern/get-users-and-intern/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { user, intern, acadmics } = res.data.data;

        setUserData(user);
        setInternData(intern);
        setAcademics(acadmics);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const renderValue = (value) =>
    value ? value : <span className="text-alert font-medium">Pending</span>;

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col flex-grow">
        <Navbar />
        <div className="max-w-4xl py-10 px-6 flex flex-col flex-grow text-black">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col flex-grow">
        <Navbar />
        <div className="max-w-4xl py-10 px-6 flex flex-col flex-grow text-alert">User not found</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col flex-grow">
      <Navbar />

      <div className="max-w-4xl py-10 px-6 flex flex-col flex-grow">
        <h1 className="text-2xl font-bold mb-6">User Details</h1>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow space-y-2">
          <p><strong>ID:</strong> {renderValue(userData._id)}</p>
          <p><strong>Name:</strong> {renderValue(userData.fullName)}</p>
          <p><strong>Email:</strong> {renderValue(userData.email)}</p>
          <p><strong>Role:</strong> {renderValue(userData.role)}</p>
        </div>

        {internData?.profileImage ? (
          <div>
            <strong>Profile Image:</strong>
            <img
              src={internData.profileImage.startsWith("http")
                ? internData.profileImage
                : `${import.meta.env.VITE_API_BASE_URL}/${internData.profileImage}`}
              alt="Profile"
              className="w-32 h-32 object-cover rounded cursor-pointer"
              onClick={() =>
                setPopupImage(
                  internData.profileImage.startsWith("http")
                    ? internData.profileImage
                    : `${import.meta.env.VITE_API_BASE_URL}/${internData.profileImage}`
                )
              }
            />
          </div>
        ) : (
          <p><strong>Profile Image:</strong> <span className="text-alert">Pending</span></p>
        )}

        {internData?.signatureImage ? (
          <div>
            <strong>Signature Image:</strong>
            <img
              src={internData.signatureImage.startsWith("http")
                ? internData.signatureImage
                : `${import.meta.env.VITE_API_BASE_URL}/${internData.signatureImage}`}
              alt="Signature"
              className="w-48 h-24 object-contain cursor-pointer"
              onClick={() =>
                setPopupImage(
                  internData.signatureImage.startsWith("http")
                    ? internData.signatureImage
                    : `${import.meta.env.VITE_API_BASE_URL}/${internData.signatureImage}`
                )
              }
            />
          </div>
        ) : (
          <p><strong>Signature Image:</strong> <span className="text-alert">Pending</span></p>
        )}

        {internData && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Intern Details</h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow space-y-2">
              <p><strong>College:</strong> {renderValue(internData.collegeName)}</p>
              <p><strong>Branch:</strong> {renderValue(internData.branch)}</p>
              <p><strong>DOB:</strong> {renderValue(internData.dob)}</p>
              <p><strong>Aadhar:</strong> {renderValue(internData.aadhar)}</p>
              <p><strong>Assigned Department:</strong> {renderValue(internData.assignDepartment?.departments)}</p>
              <p><strong>Mentor ID:</strong> {renderValue(internData.mentorId?.userId)}</p>
            </div>
          </div>
        )}

        {academics && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Academic Details</h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow space-y-2">
              <p><strong>Semester:</strong> {renderValue(academics.semester)}</p>
              <p><strong>Session:</strong> {renderValue(academics.session)}</p>
            </div>
          </div>
        )}
      </div>

      {popupImage && (
  <div
    className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <button
      onClick={() => setPopupImage(null)}
      className="absolute top-4 right-4 text-white rounded-full bg-secondary hover:bg-primary p-2 cursor-pointer aspect-square text-xl font-bold z-50"
      aria-label="Close"
    >
      <Cross2Icon/>
    </button>
    <img
      src={popupImage}
      alt="Full Screen"
      className="max-w-full max-h-full object-contain cursor-pointer sm:p-5"
    />
  </div>
)}

      <Footer />
    </div>
  );
};

export default ViewInternOrUser;
