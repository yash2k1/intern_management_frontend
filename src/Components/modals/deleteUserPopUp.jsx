import React, { useState } from 'react';
import MainButtons from '../Ui/MainButtons';

const DeleteUserModal = ({ isOpen, onClose, onDelete, userName }) => {
  const [inputName, setInputName] = useState('');

  if (!isOpen) return null;

  const handleDelete = () => {
    if (inputName === userName) {
      onDelete();
      setInputName('');
    }
  };

  const handleClose = () => {
    setInputName('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-red-600 mb-3">
          Delete Your Account
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
          This action is irreversible. To confirm, type your name exactly as shown:{`"${userName}"`}
        </p>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Enter your name here..."
          className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white mb-6"
        />

        <div className="flex justify-end space-x-3">
          <MainButtons
            title="Cancel"
            onClick={handleClose}
            className="cursor-pointer"
          />
          <MainButtons
            title="Delete"
            onClick={handleDelete}
            disabled={inputName !== userName}
            className={`cursor-pointer ${
              inputName !== userName ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
