import React from 'react';

const ConfirmDesignationModal = ({ isOpen, onClose, onConfirm, member, newDesignation }) => {
  if (!isOpen || !member) return null;

  return (
      <div className="fixed inset-0  bg-transparent bg-opacity-50 flex items-center justify-center z-50"  onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 mx-4 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4 text-center">Confirm Change</h2>
        <p className="mb-2">You are about to change the designation of:</p>
        <ul className="mb-4 text-sm">
          <li><strong>Name:</strong> {member.name}</li>
          <li><strong>Email:</strong> {member.email}</li>
          <li><strong>Current:</strong> {member.designation}</li>
          <li><strong>New:</strong> {newDesignation}</li>
        </ul>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(member.id, newDesignation)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDesignationModal;
