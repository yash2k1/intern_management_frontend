import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Ui/Navbar';
import SubmitPopUp from '../Components/modals/SubmitPopUp';
import MainButtons from '../Components/Ui/MainButtons';
import Footer from '../Components/Ui/Footer';

const OngoingProjects = () => {
    const fakeApiData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering', status: 'Pending' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Marketing', status: 'Pending' },
        { id: 3, name: 'Alex Johnson', email: 'alex@example.com', department: 'Finance', status: 'Pending' },
        { id: 4, name: 'Priya Patel', email: 'priya@example.com', department: 'HR', status: 'Pending' },
        { id: 5, name: 'Rahul Verma', email: 'rahul@example.com', department: 'Design', status: 'Pending' },
        { id: 6, name: 'Rahul Verma', email: 'rahul@example.com', department: 'Design', status: 'Pending' },
        { id: 7, name: 'Rahul Verma', email: 'rahul@example.com', department: 'Design', status: 'Pending' },
        { id: 8, name: 'Rahul Verma', email: 'rahul@example.com', department: 'Design', status: 'Pending' },
        { id: 9, name: 'Rahul Verma', email: 'rahul@example.com', department: 'Design', status: 'Pending' },
        { id: 10, name: 'Rahul Verma', email: 'rahul@example.com', department: 'Design', status: 'Pending' },
        { id: 13, name: 'Rahul Verma', email: 'rahul@example.com', department: 'Design', status: 'Pending' },
        { id: 17, name: 'Rahul Verma', email: 'rahul@example.com', department: 'Design', status: 'Pending' },
    ];

    const [interns, setInterns] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        setTimeout(() => {
            setInterns(fakeApiData);
        }, 500);
    }, []);

    const handleApprovedClick = (student) => {
        setSelectedStudent(student);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedStudent(null);
    };

    const handleConfirm = ({ image, isSubmitted }) => {
        if (!selectedStudent) return;
        const updatedInterns = interns.map((intern) =>
            intern.id === selectedStudent.id
                ? { ...intern, status: isSubmitted === 'yes' ? 'Submitted' : 'Not Submitted', projectImage: image || null }
                : intern
        );
        setInterns(updatedInterns);
        handleClosePopup();
    };

    const totalPages = Math.ceil(interns.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentInterns = interns.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
            <Navbar />

                <div className="w-full max-w-[950px] mx-auto flex-grow flex flex-col mb-4  px-4">
                    <div className="flex justify-between py-6">
                        <h2 className="text-xl font-semibold">Ongoing Projects</h2>
                        <MainButtons
                            title={"← Back"}
                            onClick={() => window.history.back()}
                            className="text-sm text-primary dark:text-white cursor-pointer hover:underline flex items-center"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-border-light">
                            <thead>
                                <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                                    <th className="py-2 px-4 border">Name</th>
                                    <th className="py-2 px-4 border">Email</th>
                                    <th className="py-2 px-4 border">Department</th>
                                    <th className="py-2 px-4 border">Status</th>
                                    <th className="py-2 px-4 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {interns.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">
                                            Loading data...
                                        </td>
                                    </tr>
                                ) : (
                                    currentInterns.map((intern) => (
                                        <tr
                                            key={intern.id}
                                            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                        >
                                            <td className="py-2 px-4 border">{intern.name}</td>
                                            <td className="py-2 px-4 border">{intern.email}</td>
                                            <td className="py-2 px-4 border">{intern.department}</td>
                                            <td className="py-2 px-4 border">{intern.status}</td>
                                            <td className="py-2 px-4 border">
                                                <div className="flex flex-wrap gap-2">
                                                    <MainButtons title={"Completed"} onClick={() => handleApprovedClick(intern)} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        {interns.length > itemsPerPage && (
                            <div className="flex justify-between items-center mt-4">
                                <MainButtons
                                    title={"Previous"}
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    className={`px-4 py-2 bg-primary text-white rounded cursor-pointer ${
                                        currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
                                    }`}
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <MainButtons
                                    title={"Next"}
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    className={`px-4 py-2 bg-primary text-white rounded cursor-pointer ${
                                        currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''
                                    }`}
                                />
                            </div>
                        )}
                    </div>
                </div>
            

            <SubmitPopUp
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                onConfirm={handleConfirm}
                student={selectedStudent}
            />

            <Footer />
        </div>
    );
};

export default OngoingProjects;
