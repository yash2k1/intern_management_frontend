import React, { useState } from 'react';
import Navbar from '../Components/Ui/Navbar';
import dummyImage from '../assets/download.png'
import imagesUpload from '../assets/imagesUpload.png'
import MainButtons from '../Components/Ui/MainButtons';
import Footer from '../Components/Ui/Footer';
const AddNewIntern = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    age: '',
    addressPresent: '',
    addressPermanent: '',
    mobile: '',
    email: '',
    qualification: '',
    branch: '',
    familyForeign: '',
    workedOrg: '',
    workedDRDO: '',
    aadhar: '',
    identificationMarks: '',
    preference: '',
    courseDuration: '',
    currentSemester: '',
    semesterMarks: {},
    profileImage: null,
    signatureImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

  const regex = /^(100(\.0{1,2})?|(\d{1,2}(\.\d{1,2})?)|PENDING\.\.\.)$/i;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSemesterMarksChange = (sem, value) => {
    if (value === '' || /^[\d.]+$/.test(value) || regex.test(value)) {
      setFormData((prev) => ({
        ...prev,
        semesterMarks: {
          ...prev.semesterMarks,
          [sem]: value,
        },
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, signatureImage: file }));
      setSignaturePreview(URL.createObjectURL(file));
    }
  };

  const cancelImage = () => {
    setFormData((prev) => ({ ...prev, profileImage: null }));
    setImagePreview(null);
  };

  const cancelSignature = () => {
    setFormData((prev) => ({ ...prev, signatureImage: null }));
    setSignaturePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      dob: '',
      age: '',
      addressPresent: '',
      addressPermanent: '',
      mobile: '',
      email: '',
      qualification: '',
      branch: '',
      familyForeign: '',
      workedOrg: '',
      workedDRDO: '',
      aadhar: '',
      identificationMarks: '',
      preference: '',
      courseDuration: '',
      currentSemester: '',
      semesterMarks: {},
      profileImage: null,
      signatureImage: null,
    });
    setImagePreview(null);
    setSignaturePreview(null);
  };

  const semesters = formData.courseDuration
    ? Array.from({ length: Number(formData.courseDuration) * 2 }, (_, i) => i + 1)
    : [];

  return (
   <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      <Navbar />
    <div className=" dark:bg-gray-900 text-text-main dark:text-white max-w-6xl mx-auto py-6 flex-grow flex flex-col w-full  px-4">
      <form
        className="max-w-6xl m-4 sm:mx-auto p-6 bg-white text-gray-800 border border-gray-300 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-primary mb-6 text-center sm:text-left">
          Internship Registration Form
        </h2>

        {/* Image Upload Container */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          {/* Profile Image Upload */}
          <div className="flex-1 justify-between border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50 dark:bg-gray-800 flex flex-col items-center">
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="my-4 w-40 h-40 object-cover rounded-md border border-gray-300 shadow"
                />
                <MainButtons
                  type="Cancel Image"
                  onClick={cancelImage}
                  className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800 focus:outline-none cursor-pointer"
                />
                
              </>
            ) : (
              <>
               <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 cursor-pointer">
                  Upload Image
                </label>
                <img
                  src={dummyImage}
                  alt="Profile Preview"
                  className="my-4 w-40 h-40 object-cover rounded-md border border-gray-300 shadow"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full cursor-pointer rounded border border-gray-300 p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
              </>
            )}
          </div>

      
        </div>

        {/* Other input fields here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[ 
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Date of Birth', name: 'dob', type: 'date' },
            { label: 'Age', name: 'age', type: 'text' },
            { label: 'Mobile No.', name: 'mobile', type: 'text' },
            { label: 'Email ID', name: 'email', type: 'email' },
            { label: 'Present Address', name: 'addressPresent', type: 'text' },
            { label: 'Permanent Address', name: 'addressPermanent', type: 'text' },
            { label: 'Educational Qualification (with institute)', name: 'qualification', type: 'text' },
            { label: 'Branch', name: 'branch', type: 'text' },
            { label: 'Course Duration (in years)', name: 'courseDuration', type: 'number' },
            { label: 'Current Semester', name: 'currentSemester', type: 'number' },
            { label: 'Aadhar Number', name: 'aadhar', type: 'text' },
            { label: 'Identification Marks', name: 'identificationMarks', type: 'text' },
          ].map((field) => (
            <label key={field.name} className="flex flex-col w-full">
              {field.label}
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </label>
          ))}

          <label className="flex flex-col sm:col-span-2 w-full">
            Details of family members working in foreign organizations / embassies (or write 'NO')
            <textarea
              name="familyForeign"
              value={formData.familyForeign}
              onChange={handleChange}
              className="border p-2 rounded w-full resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <label className="flex flex-col sm:col-span-2 w-full">
            Have you worked with any organization in India or abroad? (or write 'NO')
            <textarea
              name="workedOrg"
              value={formData.workedOrg}
              onChange={handleChange}
              className="border p-2 rounded w-full resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <label className="flex flex-col sm:col-span-2 w-full">
            Have you worked with DRDO Labs/Estts. earlier? (or write 'NO')
            <textarea
              name="workedDRDO"
              value={formData.workedDRDO}
              onChange={handleChange}
              className="border p-2 rounded w-full resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <label className="flex flex-col sm:col-span-2 w-full">
            Internship Preference
            <select
              name="preference"
              value={formData.preference}
              onChange={handleChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Internship Preference</option>
              <option value="Research">Research</option>
              <option value="Development">Development</option>
              <option value="Project Work">Project Work</option>
            </select>
          </label>
        </div>

        {formData.courseDuration && formData.currentSemester && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-primary mb-4">
              Semester Marks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {semesters
                .slice(0, Number(formData.currentSemester))
                .map((sem) => (
                  <div key={sem} className="flex flex-col w-full">
                    <label>Semester {sem} Marks (% or PENDING...)</label>
                    <div className="flex flex-col sm:flex-row gap-2 mt-1">
                      <input
                        type="text"
                        value={formData.semesterMarks[sem] || ''}
                        onChange={(e) =>
                          handleSemesterMarksChange(sem, e.target.value)
                        }
                        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    
                       <MainButtons
              title={ 'Set Pending'}
                onClick={() =>  handleSemesterMarksChange(sem, 'PENDING...')}
             
            />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
            {/* Signature Upload */}
          <div className="flex-1 justify-between gap-4 my-4  border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50 dark:bg-gray-800 flex flex-col items-center">
            {signaturePreview ? (
              <>
                <img
                  src={signaturePreview}
                  alt="Signature Preview"
                  className="my-4 w-40 h-20 object-contain rounded-md border border-gray-300 shadow"
                />
                <button
                  type="button"
                  onClick={cancelSignature}
                  className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800 focus:outline-none cursor-pointer"
                >
                  Cancel Signature
                </button>
              </>
            ) : (
              <>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 cursor-pointer">
                  Upload Signature
                </label>
                 <img
                  src={imagesUpload}
                  alt="Profile Preview"
                  className="my-4 w-40 h-40 object-cover rounded-md border border-gray-300 shadow"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSignatureUpload}
                  className="w-full cursor-pointer rounded border border-gray-300 p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
              </>
            )}
          </div>
        <div className="mt-6 flex flex-col items-center sm:justify-end sm:flex-row gap-4">
           <MainButtons
              title={ 'Add New Intern'}
              onClick={handleSubmit}
             
            />
            <MainButtons
              title={"Cancel"}
              onClick={()=>handleCancel()}
            
            />
        </div>

        
      </form>
    </div>
    <Footer/>
    </div>
  );
};

export default AddNewIntern;