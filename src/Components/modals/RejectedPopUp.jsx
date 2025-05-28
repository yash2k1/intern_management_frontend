import React, { useState } from 'react';

const RejectedPopUp = ({ isOpen, onClose, onConfirm, student, mentors = [] }) => {
  const [remark, setRemark] = useState('');
  const [selectedMentor, setSelectedMentor] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-transparent bg-opacity-50 flex items-center justify-center z-50"  onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        {/* Student Info */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-lg font-semibold">
            {student.name[0]}
          </div>
          <div>
            <div className="font-semibold text-black dark:text-white">{student.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-300">{student.preference || 'Student Preference'}</div>
          </div>
        </div>

        {/* Remark Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black dark:text-white mb-1">Remark</label>
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
          <label className="block text-sm font-medium text-black dark:text-white mb-1 ">
            Suggest Another Mentor
          </label>
          <select
            value={selectedMentor}
            onChange={(e) => setSelectedMentor(e.target.value)}
            className="w-full p-2 cursor-pointer border border-border-light rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
          >
            <option value="">-- Select Mentor --</option>
            {mentors.map((mentor, index) => (
              <option key={index} value={mentor}>
                {mentor}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <MainButtons
            title="Cancel"
            onClick={() => onClose()}
          />
          <MainButtons
            title="Reject"
            onClick={() =>  onConfirm({ remark, suggestedMentor: selectedMentor })}
          />
        </div>
      </div>
    </div>
  );
};

export default RejectedPopUp;
