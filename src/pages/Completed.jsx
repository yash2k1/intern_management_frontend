import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Ui/Navbar';
import SubmitPopUp from '../Components/modals/SubmitPopUp';

const completed = () => {
    // Simulated API data
    const fakeApiData = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            department: 'Engineering',
            status: 'Pending',
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            department: 'Marketing',
            status: 'Pending',
        },
        {
            id: 3,
            name: 'Alex Johnson',
            email: 'alex@example.com',
            department: 'Finance',
            status: 'Pending',
        },
        {
            id: 4,
            name: 'Priya Patel',
            email: 'priya@example.com',
            department: 'HR',
            status: 'Pending',
        },
        {
            id: 5,
            name: 'Rahul Verma',
            email: 'rahul@example.com',
            department: 'Design',
            status: 'Pending',
        },
    ];

    const [interns, setInterns] = useState([]);
  
    useEffect(() => {
        setTimeout(() => {
            setInterns(fakeApiData);
        }, 500);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-text-main dark:text-white flex flex-col">
            <Navbar />
            <div className="w-full flex justify-center px-4">
                <div className="w-full max-w-[950px]">
                    <div className="flex items-center justify-between py-6">
                        <h2 className="text-xl font-semibold">Ongoing Projects</h2>
                        <button
                            className="text-sm text-primary dark:text-white cursor-pointer hover:underline flex items-center"
                            onClick={() => window.history.back()}
                        >
                            ← Back
                        </button>
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
                                    interns.map((intern) => (
                                        <tr
                                            key={intern.id}
                                            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                        >
                                            <td className="py-2 px-4 border">{intern.name}</td>
                                            <td className="py-2 px-4 border">{intern.email}</td>
                                            <td className="py-2 px-4 border">{intern.department}</td>
                                            <td className="py-2 px-4 border"> {intern.status}  </td>
                                            <td className="py-2 px-4 border"> {intern.status}  </td>
                                            
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

         
        
        </div>
    );
};

export default completed;
