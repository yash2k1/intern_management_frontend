import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Ui/Navbar';
import MainButtons from '../Components/Ui/MainButtons';
import ConfirmDesignationModal from '../Components/modals/ConfirmDesignationModal';
import Footer from '../Components/Ui/Footer';

const Members = () => {
    const [members, setMembers] = useState([]);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [pendingChange, setPendingChange] = useState({ member: null, newDesignation: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isHr, setisHr] = useState(true);//temp- this ensure only hr can change the role of user-intern,mentor,hr
    const fakeApiData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', designation: 'INTERN' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', designation: 'HR' },
        { id: 3, name: 'Alex Johnson', email: 'alex@example.com', designation: 'MENTOR' },
        { id: 4, name: 'Priya Patel', email: 'priya@example.com', designation: 'INTERN' },
        { id: 5, name: 'Rahul Verma', email: 'rahul@example.com', designation: 'HR' },
        { id: 6, name: 'Sneha Kumar', email: 'sneha@example.com', designation: 'MENTOR' },
        { id: 7, name: 'Vikram Rana', email: 'vikram@example.com', designation: 'INTERN' },
        { id: 8, name: 'Kajal Yadav', email: 'kajal@example.com', designation: 'HR' },
        { id: 9, name: 'Aman Jain', email: 'aman@example.com', designation: 'MENTOR' },
        { id: 10, name: 'Neha Rathi', email: 'neha@example.com', designation: 'HR' },
        { id: 11, name: 'Ravi Singh', email: 'ravi@example.com', designation: 'INTERN' },
        { id: 12, name: 'Tina Das', email: 'tina@example.com', designation: 'MENTOR' }
    ];

    useEffect(() => {
        setTimeout(() => setMembers(fakeApiData), 500);
    }, []);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1); // reset to first page
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // reset to first page
    };

    const filteredMembers = members.filter((member) => {
        const matchesFilter = filter === 'All' || member.designation === filter;
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const paginatedMembers = filteredMembers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const openConfirmationModal = (member, newDesignation) => {
        if (member.designation === newDesignation) return;
        setPendingChange({ member, newDesignation });
        setShowModal(true);
    };

    const confirmChange = (id, newDesignation) => {
        const updated = members.map(m =>
            m.id === id ? { ...m, designation: newDesignation } : m
        );
        setMembers(updated);
        setShowModal(false);
        setPendingChange({ member: null, newDesignation: '' });
    };

    const cancelModal = () => {
        setShowModal(false);
        setPendingChange({ member: null, newDesignation: '' });
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
            <Navbar />

            <div className="max-w-6xl mx-auto py-6 flex-grow flex flex-col w-full  px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Members Info</h2>
                    <MainButtons
                        title="← Back"
                        onClick={() => window.history.back()}
                        className="text-sm text-primary dark:text-white cursor-pointer hover:underline flex items-center"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 w-full">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="w-full sm:flex-1 px-3 py-2 border rounded dark:bg-gray-800"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <div className="w-full sm:w-auto relative overflow-visible">
                        <select
                            className="w-40 sm:w-full px-3 py-2 border rounded dark:bg-gray-800"
                            value={filter}
                            onChange={handleFilterChange}
                        >
                            <option value="All">All</option>
                            <option value="INTERN">INTERN</option>
                            <option value="HR">HR</option>
                            <option value="MENTOR">MENTOR</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 dark:border-gray-700">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-2 border">S.No.</th>
                                <th className="px-4 py-2 border">ID</th>
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Designation</th>
                                {isHr && <th className="px-4 py-2 border">Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedMembers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No members found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedMembers.map((member, index) => (
                                    <tr
                                        key={member.id}
                                        className="hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                    >
                                        <td className="px-4 py-2 border">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </td>
                                        <td className="px-4 py-2 border">{member.id}</td>
                                        <td className="px-4 py-2 border">{member.name}</td>
                                        <td className="px-4 py-2 border">{member.email}</td>
                                        <td className="px-4 py-2 border">{member.designation}</td>
                                       {isHr && <td className="px-4 py-2 border flex justify-center">
                                             <select
                                                value={member.designation}
                                                onChange={(e) => openConfirmationModal(member, e.target.value)}
                                                className="p-1 rounded border dark:bg-gray-700"
                                            >
                                                <option value="INTERN">INTERN</option>
                                                <option value="HR">HR</option>
                                                <option value="MENTOR">MENTOR</option>
                                            </select>
                                        </td>}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    {filteredMembers.length > itemsPerPage && (
                        <div className="flex justify-between items-center mt-4">
                            <MainButtons
                                title={"Previous"}
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className={`px-4 py-2 bg-primary text-white rounded cursor-pointer ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
                                    }`}
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Page {currentPage} of {totalPages}
                            </span>
                            <MainButtons
                                title={"Next"}
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                className={`px-4 py-2 mb-4 bg-primary text-white rounded cursor-pointer ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''
                                    }`}
                            />
                        </div>
                    )}
                </div>


                <ConfirmDesignationModal
                    isOpen={showModal}
                    onClose={cancelModal}
                    onConfirm={confirmChange}
                    member={pendingChange.member}
                    newDesignation={pendingChange.newDesignation}
                />
            </div>
            <Footer />
        </div>
    );
};

export default Members;
