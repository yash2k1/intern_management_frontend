import React, { useState } from "react";
import MainButtons from "../Ui/MainButtons";
import axios from "axios";
import toast from "react-hot-toast";

const RejectedPopUp = ({
  isOpen,
  onClose,
  onConfirm,
  student,
  mentors = [],
}) => {
  const [remark, setRemark] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleReject = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication error. Please log in.");
      return;
    }

    try {
      setLoading(true);

      // Step 2: Suggest another mentor
      if (selectedMentor) {
        const suggestRes = await axios.put(
          `http://localhost:5000/mentor/intern/${student._id}/suggest-mentor`,
          { suggestedMentorId: selectedMentor },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!suggestRes.data.success) {
          toast.error("Failed to suggest a new mentor.");
          return;
        }
      }
      // Step 1: Remove intern from mentor and update status to "WAITING"
      const removeRes = await axios.put(
        `http://localhost:5000/mentor/remove-intern/${student._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!removeRes.data.success) {
        toast.error("Failed to remove intern from mentor.");
        return;
      }

      toast.success("Intern rejected and suggested mentor updated.");
      onConfirm({ remark, suggestedMentor: selectedMentor });
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during rejection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Student Info */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-lg font-semibold">
            {student?.userId?.fullName?.[0]}
          </div>
          <div>
            <div className="font-semibold text-black dark:text-white">
              {student?.userId?.fullName}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              {student?.preference || "Student Preference"}
            </div>
          </div>
        </div>

        {/* Remark */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black dark:text-white mb-1">
            Remark
          </label>
          <textarea
            rows={4}
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className="w-full p-2 border border-[--color-border-light] rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
            placeholder="Enter reason for rejection..."
          />
        </div>

        {/* Mentor Suggestion Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-black dark:text-white mb-1">
            Suggest Another Mentor
          </label>
          <select
            value={selectedMentor}
            onChange={(e) => setSelectedMentor(e.target.value)}
            className="w-full p-2 cursor-pointer border border-border-light rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
          >
            <option value="">-- Select Mentor --</option>
            {mentors.map((mentor) => (
              <option key={mentor._id} value={mentor._id}>
                {mentor.userId?.fullName}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <MainButtons title="Cancel" onClick={onClose} />
          <MainButtons
            title={loading ? "Rejecting..." : "Reject"}
            onClick={handleReject}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full"
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default RejectedPopUp;
