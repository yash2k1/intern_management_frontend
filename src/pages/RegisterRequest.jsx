import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Ui/Navbar';
import MainButtons from '../Components/Ui/MainButtons';
import Footer from '../Components/Ui/Footer';

const RegisterRequest = () => {
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Simulated API data for registration requests
    const fakeApiData = [
        { id: 1, time: '09:30 AM', date: '2025-05-20', name: 'John Doe', email: 'john@example.com' },
        { id: 2, time: '10:15 AM', date: '2025-05-20', name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, time: '11:00 AM', date: '2025-05-21', name: 'Alex Johnson', email: 'alex@example.com' },
        { id: 4, time: '01:45 PM', date: '2025-05-21', name: 'Priya Patel', email: 'priya@example.com' },
        { id: 5, time: '02:30 PM', date: '2025-05-22', name: 'Rahul Verma', email: 'rahul@example.com' },
        { id: 6, time: '03:15 PM', date: '2025-05-22', name: 'Anjali Singh', email: 'anjali@example.com' },
        { id: 7, time: '04:00 PM', date: '2025-05-23', name: 'Ravi Kumar', email: 'ravi@example.com' },
        { id: 8, time: '04:45 PM', date: '2025-05-23', name: 'Sunita Yadav', email: 'sunita@example.com' },
        { id: 9, time: '05:30 PM', date: '2025-05-24', name: 'Aman Gupta', email: 'aman@example.com' },
        { id: 10, time: '06:15 PM', date: '2025-05-24', name: 'Meena Rawat', email: 'meena@example.com' },
        { id: 11, time: '07:00 PM', date: '2025-05-25', name: 'Sameer Khan', email: 'sameer@example.com' },
        { id: 12, time: '07:45 PM', date: '2025-05-25', name: 'Tina Das', email: 'tina@example.com' }
    ];

    useEffect(() => {
        setTimeout(() => {
            setRequests(fakeApiData);
        }, 500);
    }, []);

    // Pagination calculation
    const totalPages = Math.ceil(requests.length / itemsPerPage);
    const paginatedRequests = requests.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle Accept or Reject actions
    const handleAction = (id, action) => {
        // For demo: just remove from the list and optionally show alert
        setRequests((prev) => prev.filter((req) => req.id !== id));
        alert(`Request ID ${id} has been ${action}`);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
            <Navbar />

            <div className="max-w-6xl mx-auto py-6 flex-grow flex flex-col w-full px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Registration Requests</h2>
                    <MainButtons
                        title="← Back"
                        onClick={() => window.history.back()}
                        className="text-sm text-primary dark:text-white cursor-pointer hover:underline flex items-center"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 dark:border-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-2 border">S.No.</th>
                                <th className="px-4 py-2 border">ID</th>
                                <th className="px-4 py-2 border">Time</th>
                                <th className="px-4 py-2 border">Date</th>
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRequests.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4">
                                        No registration requests found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedRequests.map((req, index) => (
                                    <tr
                                        key={req.id}
                                        className="hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                    >
                                        <td className="px-4 py-2 border">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </td>
                                        <td className="px-4 py-2 border">{req.id}</td>
                                        <td className="px-4 py-2 border">{req.time}</td>
                                        <td className="px-4 py-2 border">{req.date}</td>
                                        <td className="px-4 py-2 border">{req.name}</td>
                                        <td className="px-4 py-2 border">{req.email}</td>
                                        <td className="px-4 py-2 border flex gap-2">
                                            <MainButtons
                                                className="px-3 py-1 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700"
                                                onClick={() => handleAction(req.id, 'accepted')}
                                                title={"Accept"}
                                            />
                                            <MainButtons
                                                className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700"
                                                onClick={() => handleAction(req.id, 'rejected')}
                                                title={"Reject"}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    {requests.length > itemsPerPage && (
                        <div className="flex justify-between items-center mt-4">
                            <MainButtons
                                title="Previous"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className={`px-4 py-2 bg-primary text-white rounded cursor-pointer ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
                                    }`}
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Page {currentPage} of {totalPages}
                            </span>
                            <MainButtons
                                title="Next"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                className={`px-4 py-2 bg-primary text-white rounded cursor-pointer ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''
                                    }`}
                            />
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default RegisterRequest;
