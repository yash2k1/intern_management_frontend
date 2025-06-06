import { useEffect, useState } from 'react';
import Navbar from '../Components/Ui/Navbar';
import Footer from '../Components/Ui/Footer';
import MainButtons from '../Components/Ui/MainButtons';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("ALL");
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
 const navigate =useNavigate();
  const fakeProjects = [
    { id: 1, title: 'Intern Tracker', intern: 'Alice', department: 'IT' },
    { id: 2, title: 'AI Resume Analyzer', intern: 'Bob', department: 'AI/ML' },
    { id: 3, title: 'Attendance Logger', intern: 'Charlie', department: 'IT' },
    { id: 4, title: 'ML Predictions', intern: 'Daisy', department: 'AI/ML' },
    { id: 5, title: 'Performance Dashboard', intern: 'Eve', department: 'IT' },
    { id: 6, title: 'Smart HR Bot', intern: 'Frank', department: 'AI/ML' },
    { id: 7, title: 'Onboarding Portal', intern: 'Grace', department: 'HR' },
  ];

  useEffect(() => {
    setTimeout(() => setProjects(fakeProjects), 300);
  }, []);

  const filtered = projects.filter(p => {
    const matchDept = departmentFilter === "ALL" || p.department === departmentFilter;
    const matchSearch = p.intern.toLowerCase().includes(search.toLowerCase()) || p.title.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      <Navbar />
      <main className="max-w-6xl mx-auto w-full px-4 py-6 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Projects</h1>
          <MainButtons
            title="← Back"
            onClick={() => window.history.back()}
            className="text-sm cursor-pointer text-primary hover:underline"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search projects or interns..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border rounded w-full sm:flex-1 dark:bg-gray-800"
          />
          <select
            value={departmentFilter}
            onChange={(e) => {
              setDepartmentFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border rounded dark:bg-gray-800 w-full sm:w-52"
          >
            <option value="ALL">ALL</option>
            <option value="IT">IT</option>
            <option value="AI/ML">AI/ML</option>
            <option value="HR">HR</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 border">S.No.</th>
                <th className="px-4 py-2 border">Project Title</th>
                <th className="px-4 py-2 border">Intern Name</th>
                <th className="px-4 py-2 border">Department</th>
                <th className="px-4 py-2 border">Info</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No projects found.
                  </td>
                </tr>
              ) : (
                paginated.map((proj, index) => (
                  <tr
                    key={proj.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <td className="px-4 py-2 border">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-2 border">{proj.title}</td>
                    <td className="px-4 py-2 border">{proj.intern}</td>
                    <td className="px-4 py-2 border">{proj.department}</td>
                    <td className="px-4 py-2 border flex justify-center ">
                      <MainButtons
                        title="Info"
                        onClick={() =>navigate('/project-list/:id')}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > itemsPerPage && (
          <div className="flex justify-between items-center mt-4">
            <MainButtons
              title="Previous"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className={`px-4 py-2 bg-primary text-white rounded cursor-pointer ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''
                }`}
            />
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <MainButtons
              title="Next"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className={`px-4 py-2 bg-primary text-white rounded cursor-pointer ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''
                }`}
            />
          </div>
        )}
      </main>
      <Footer/>
    </div>
  );
};

export default ProjectList;
