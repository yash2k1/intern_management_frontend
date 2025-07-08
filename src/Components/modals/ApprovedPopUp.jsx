import React, { useState } from "react";
import MainButtons from "../Ui/MainButtons";
import axios from "axios";
import toast from "react-hot-toast";

const ApprovedPopUp = ({ isOpen, onClose, student, refreshData }) => {
  const [title, setTitle] = useState("Title of project...");
  const [subTitle, setSubTitle] = useState("Subtitle of project...");
  const [description, setDescription] = useState(
    "Enter the project details..."
  );

  if (!isOpen || !student) return null;

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/mentor/intern/${student._id}/status`,
        { status: "ONGOING" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Status updated to ONGOING ✅");
      onClose(); // Close the popup
      if (refreshData) refreshData(); // Refresh list if function provided
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status ❌");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Student Info */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-lg font-semibold">
            {student?.userId?.fullName?.[0] || "S"}
          </div>
          <div>
            <div className="font-semibold text-black dark:text-white">
              {student?.userId?.fullName || "Student Name"}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              {student?.preference || "Student Preference"}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
            placeholder="Enter project title"
          />
        </div>

        {/* Subtitle */}
        <div className="mb-2">
          <input
            type="text"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
            placeholder="Enter project subtitle"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
            placeholder="Enter project description"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <MainButtons title="Cancel" onClick={onClose} />
          <MainButtons title="Accepted" onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
};

export default ApprovedPopUp;
