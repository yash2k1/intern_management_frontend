import React, { useState } from 'react';

const SubmitPopUp = ({ isOpen, onClose, onConfirm, student }) => {
  const [image, setImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState('no');

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md m-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Student Info */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-lg font-semibold">
            {student.name[0]}
          </div>
          <div>
            <div className="font-semibold text-black dark:text-white">{student.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              {student.preference || 'Student Preference'}
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black dark:text-white mb-1">
            Project Completion Form Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700 dark:text-white cursor-pointer"
          />
          {image && (
            <div className="mt-2 space-y-2 flex items-center flex-col">
              <img
                src={image}
                alt="Uploaded Preview"
                className="max-w-full h-auto rounded-md max-h-70"
              />
              <div className='flex '>
              <a
                href={image}
                download="project-completion.jpg"
                className="flex items-center justify-center px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 mx-2"
              >
                Download Image
              </a>
              <div className='bg-alert hover:bg-alert-light cursor-pointer flex items-center justify-center px-3 py-1 text-sm mx-2  text-white rounded' onClick={()=>setImage(null)}>Remove</div>
              </div>
            </div>
          )}
        </div>

        {/* Radio Buttons */}
        <div className="mb-6">
          <p className="text-sm font-medium text-black dark:text-white mb-1">
            Project Report is Submitted?
          </p>
          <div className="flex space-x-4 text-black dark:text-white">
            <label className="flex items-center cursor-pointer space-x-2">
              <input
                type="radio"
                name="submitted"
                value="yes"
                checked={isSubmitted === 'yes'}
                onChange={() => setIsSubmitted('yes')}
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center cursor-pointer space-x-2">
              <input
                type="radio"
                name="submitted"
                value="no"
                checked={isSubmitted === 'no'}
                onChange={() => setIsSubmitted('no')}
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-white text-sm bg-secondary cursor-pointer hover:bg-primary"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm({ image, isSubmitted })}
            className="px-4 py-2 rounded-full text-white text-sm bg-secondary cursor-pointer hover:bg-primary"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitPopUp;
