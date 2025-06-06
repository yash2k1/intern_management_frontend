import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Ui/Navbar';
import Footer from '../Components/Ui/Footer';
import MainButtons from '../Components/Ui/MainButtons';

const ElevateRole = () => {
    const [requests, setRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fakeRequests = Array.from({ length: 23 }, (_, i) => ({
        id: `REQ${i + 1}`,
        mentorName: 'Item 1',
        description: 'Item 1',
        requestTime: 'Item 1',
    }));

    useEffect(() => {
        setTimeout(() => setRequests(fakeRequests), 300);
    }, []);

    const totalPages = Math.ceil(requests.length / itemsPerPage);
    const paginatedRequests = requests.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
            <Navbar />
            <div className="max-w-6xl mx-auto py-6 flex-grow flex flex-col w-full px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Role Elevation Requests</h2>
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
                                <th className="px-4 py-2 border">Request ID</th>
                                <th className="px-4 py-2 border">Mentor Name</th>
                                <th className="px-4 py-2 border">Description</th>
                                <th className="px-4 py-2 border">Request Time</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedRequests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        No requests found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedRequests.map((req, index) => (
                                    <tr key={req.id} className="hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                                        <td className="px-4 py-2 border">{req.id}</td>
                                        <td className="px-4 py-2 border">{req.mentorName}</td>
                                        <td className="px-4 py-2 border">{req.description}</td>
                                        <td className="px-4 py-2 border">{req.requestTime}</td>
                                        <td className="px-4 py-2 border text-center space-x-2">
                                            <MainButtons
                                                title="Approved"
                                                onClick={() => alert(`Approved ${req.id}`)}
                                                className="bg-secondary hover:bg-primary text-white px-3 py-1 rounded cursor-pointer"
                                            />
                                            <MainButtons
                                                title="Rejected"
                                                onClick={() => alert(`Rejected ${req.id}`)}
                                                className="bg-secondary hover:bg-alert text-white px-3 py-1 rounded cursor-pointer"
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {requests.length > itemsPerPage && (
                        <div className="flex justify-between items-center mt-4">
                            <MainButtons
                                title="Previous"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className={`px-4 py-2 bg-primary text-white rounded cursor-pointer ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Page {currentPage} of {totalPages}
                            </span>
                            <MainButtons
                                title="Next"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                className={`px-4 py-2 mb-4 bg-primary text-white rounded cursor-pointer ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
                            />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ElevateRole;
