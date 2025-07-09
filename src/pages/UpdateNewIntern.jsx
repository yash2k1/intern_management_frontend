import { useState, useEffect } from 'react';
import Navbar from '../Components/Ui/Navbar';
import Footer from '../Components/Ui/Footer';
import dummyImage from '../assets/download.png';
import imagesUpload from '../assets/imagesUpload.png';
import MainButtons from '../Components/Ui/MainButtons';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UpadateNewIntern = () => {
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
        collegeName: '',
        course: '',
        courseDuration: '',
        currentSemester: '',
        semesterMarks: {},
        profileImage: null,
        signatureImage: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [signaturePreview, setSignaturePreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInternData = async () => {
            const searchParams = new URLSearchParams(window.location.search);
            const urlToken = searchParams.get('token');
            const token = urlToken || localStorage.getItem('token');
            if (!token) return;

            try {
                const decoded = jwtDecode(token);
                const userId = decoded.userId;
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/intern/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = res.data?.intern;
                const user = res.data?.intern?.userId;
                const academic = res.data?.intern?.semId;
                console.log("data", res, academic?.semesterMarks)

                if (data) {
                    setFormData((prev) => ({
                        ...prev,
                        name: user?.fullName || '',
                        dob: data?.dob?.substring(0, 10) || '',
                        age: data?.age || '',
                        addressPresent: data?.addressPresent || '',
                        addressPermanent: data?.addressPermanent || '',
                        mobile: data?.mobile || '',
                        email: user?.email || '',
                        qualification: data?.qualification || '',
                        branch: data?.branch || '',
                        familyForeign: data?.familyForeign || '',
                        workedOrg: data?.workedOrg || '',
                        workedDRDO: data?.workedDRDO || '',
                        aadhar: data?.aadhar || '',
                        identificationMarks: data?.identificationMarks || '',
                        preference: data?.preference || '',
                        collegeName: data?.collegeName || '',
                        course: data?.course || '',
                        courseDuration: academic?.courseDuration || '',
                        currentSemester: academic?.currentSemester || '',
                        semesterMarks: academic?.semesterMarks || {},
                        profileImage: data?.profileImage ? `${import.meta.env.VITE_API_BASE_URL}/${data.profileImage}` : null,
                        signatureImage: data?.signatureImage ? `${import.meta.env.VITE_API_BASE_URL}/${data.signatureImage}` : null,
                    }));

                    if (data.profileImage) setImagePreview(`${import.meta.env.VITE_API_BASE_URL}/${data.profileImage}`);
                    if (data.signatureImage) setSignaturePreview(`${import.meta.env.VITE_API_BASE_URL}/${data.signatureImage}`);
                }
            } catch (err) {
                console.error('Error loading intern data:', err);
                toast.error('Failed to load intern data');
            }
        };

        fetchInternData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSemesterMarksChange = (sem, value) => {
        setFormData((prev) => ({
            ...prev,
            semesterMarks: { ...prev.semesterMarks, [sem]: value },
        }));
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
            collegeName: '',
            course: '',
            courseDuration: '',
            currentSemester: '',
            semesterMarks: {},
            profileImage: null,
            signatureImage: null,
        });
        setImagePreview(null);
        setSignaturePreview(null);
    };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (submitting) return;
  setSubmitting(true);

  const searchParams = new URLSearchParams(window.location.search);
  const urlToken = searchParams.get('token');
  const token = urlToken || localStorage.getItem('token');
  if (!token) {
    setSubmitting(false);
    return toast.error('User not authenticated', {
      style: { background: '#fee2e2', color: '#b91c1c', fontWeight: 'bold' },
      icon: '📩',
    });
  }

  try {
    const decoded = jwtDecode(token);
    const userId = decoded.userId;

    const semesterMarks = {};
    for (let i = 1; i <= Number(formData.currentSemester); i++) {
      const key = `Semester ${i}`;
      semesterMarks[key] = formData.semesterMarks[key] || 'PENDING...';
    }

    const formPayload = new FormData();
    formPayload.append('userId', userId);
    formPayload.append('fullName', formData.name);
    formPayload.append('email', formData.email);
    formPayload.append('phoneNumber', formData.mobile);
    formPayload.append('aadhar', formData.aadhar);
    formPayload.append('addressPresent', formData.addressPresent);
    formPayload.append('addressPermanent', formData.addressPermanent);
    formPayload.append('preference', formData.preference);
    formPayload.append('collegeName', formData.collegeName);
    formPayload.append('course', formData.course);
    formPayload.append('dob', formData.dob);
    formPayload.append('age', formData.age);
    formPayload.append('mobile', formData.mobile);
    formPayload.append('qualification', formData.qualification);
    formPayload.append('branch', formData.branch);
    formPayload.append('familyForeign', formData.familyForeign);
    formPayload.append('workedOrg', formData.workedOrg);
    formPayload.append('workedDRDO', formData.workedDRDO);
    formPayload.append('identificationMarks', formData.identificationMarks);
    formPayload.append('courseDuration', Number(formData.courseDuration));
    formPayload.append('currentSemester', Number(formData.currentSemester));
    if (formData.profileImage) formPayload.append('profileImage', formData.profileImage);
    if (formData.signatureImage) formPayload.append('signatureImage', formData.signatureImage);
    formPayload.append('semesterMarks', JSON.stringify(semesterMarks));

    await axios.put(`${import.meta.env.VITE_API_BASE_URL}/intern/${userId}`, formPayload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (urlToken) {
      setTimeout(() => {
        navigate('/sign-in');
        // navigate('/sign-in', { replace: true });

      }, 1500);
    }

    toast.success('Intern updated successfully');
    handleCancel();
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    toast.error(message, {
      style: { background: '#fee2e2', color: '#b91c1c', fontWeight: 'bold' },
      icon: '📩',
    });
  } finally {
    setSubmitting(false);
  }
};

    const semesters = formData.courseDuration
        ? Array.from({ length: Number(formData.courseDuration) * 2 }, (_, i) => i + 1)
        : [];

    const preferenceOptions = [
        { label: 'Research', value: '64a4c8d1f5a9e12345678901' },
        { label: 'Development', value: '64a4c8d1f5a9e12345678902' },
        { label: 'Project Work', value: '64a4c8d1f5a9e12345678903' },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
            <Navbar />
            <div className="dark:bg-gray-900 text-text-main dark:text-white max-w-6xl mx-auto py-6 flex-grow flex flex-col w-full px-4">
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
                                    <button
                                        type="button"
                                        onClick={cancelImage}
                                        className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-800 focus:outline-none cursor-pointer"
                                    >
                                        Cancel Image
                                    </button>
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

                    {/* Input Fields */}
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
                            { label: 'College Name', name: 'collegeName', type: 'text' },
                            { label: 'Course', name: 'course', type: 'text' },
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
                                required
                            >
                                <option value="">Select Internship Preference</option>
                                {preferenceOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    {formData.courseDuration && formData.currentSemester && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-primary mb-4">Semester Marks</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {semesters
                                    .slice(0, Number(formData.currentSemester))
                                    .map((sem) => (
                                        <div key={sem} className="flex flex-col w-full">
                                            <label>Semester {sem} Marks (% or PENDING...)</label>
                                            <div className="flex flex-col sm:flex-row gap-2 mt-1">
                                                <input
                                                    type="text"
                                                    value={formData.semesterMarks[`Semester ${sem}`] || ''}
                                                    onChange={(e) => handleSemesterMarksChange(`Semester ${sem}`, e.target.value)}
                                                    className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                                <MainButtons
                                                    title={'Pending'}
                                                    onClick={() => handleSemesterMarksChange(sem, 'PENDING...')}
                                                    className="w-40% text-sm cursor-pointer px-4 py-2 rounded-full bg-secondary text-white font-medium shadow-md hover:bg-primary dark:hover:bg-primary transition-all"
                                                />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* Signature Upload */}
                    <div className="flex-1 justify-between gap-4 my-4 border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50 dark:bg-gray-800 flex flex-col items-center">
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
                                    alt="Signature Placeholder"
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
                        <button
                            type="submit"
                            disabled={submitting}
                            className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all ${submitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-secondary text-white hover:bg-primary dark:hover:bg-primary'
                                }`}
                        >
                            {submitting ? 'Submitting...' : 'Update Intern'}
                        </button>
                        <MainButtons title={'Cancel'} onClick={handleCancel} />
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );

};

export default UpadateNewIntern;
