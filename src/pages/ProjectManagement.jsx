import React, { useEffect, useState } from 'react';
import MainButtons from '../Components/Ui/MainButtons';
import { useNavigate, useParams } from 'react-router-dom';
import TodoList from '../Components/Ui/TodoList';
import Navbar from '../Components/Ui/Navbar';
import Footer from '../Components/Ui/Footer';

const ProjectManagement = ({ currentUserRole = 'MENTOR', currentUserName = 'Anonymous' }) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditAchivementShow, setIsEditAchivementShow] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    // team member
    const [teamMembers, setTeamMembers] = useState([]);
    const [newMemberName, setNewMemberName] = useState('');
    const [newMemberRole, setNewMemberRole] = useState('MEMBER');

    const [timeline, setTimeline] = useState([]);
    const [todos, setTodos] = useState([]);
    const [achievements, setAchievements] = useState([]);

    // For project and Resources
    const [details, setDetails] = useState('');

    // For timeline inputs
    const [newTimelineStartDate, setNewTimelineStartDate] = useState('');
    const [newTimelineEndDate, setNewTimelineEndDate] = useState('');
    const [newTimelineMilestone, setNewTimelineMilestone] = useState('');

    // For achievements inputs
    const [newAchStartDate, setNewAchStartDate] = useState('');
    const [newAchEndDate, setNewAchEndDate] = useState('');
    const [newAchText, setNewAchText] = useState('');
    const [newAchPdf, setNewAchPdf] = useState('');

    useEffect(() => {
        setTimeout(() => {
            const fakeProject = {
                name: 'AI Research Tool',
                members: [
                    { name: 'Yash Gupta', role: 'MENTOR' },
                    { name: 'Reshav Choudhary', role: 'ADMIN' },
                    { name: 'Amit Kumar', role: 'MEMBER' },
                ],
                timeline: [
                    { startDate: '2025-06-01', endDate: '2025-06-05', milestone: 'Initial Planning' },
                    { startDate: '2025-06-06', endDate: '2025-06-15', milestone: 'Model Design' },
                ],
                details: 'This project focuses on developing an AI tool for document classification and analysis.',
                resources: [
                    'https://github.com/example/ai-research',
                    'https://huggingface.co/models',
                ],
                todos: [
                    {
                        creator: 'Yash',
                        title: 'Initial Setup',
                        subtitle: 'Setup project repo and folder structure',
                        tasks: [
                            { text: 'Create repo', done: true },
                            { text: 'Setup ESLint', done: false },
                        ],
                    },
                ],
                achievements: [
                    {
                        startDate: '2025-05-01',
                        endDate: '2025-06-30',
                        text: 'Completed MVP and deployed to staging',
                        pdf: null,
                        creator: 'Yash Gupta',
                    },
                ],
            };

            setProject(fakeProject);
            setTeamMembers(fakeProject.members);
            setTimeline(fakeProject.timeline);
            setDetails(fakeProject.details);
            setResources(fakeProject.resources);
            setTodos(fakeProject.todos);
            setAchievements(fakeProject.achievements);
            setLoading(false);
        }, 1000);
    }, [id]);

    //for Resources
    const [resources, setResources] = useState([]);
    const [newResource, setNewResource] = useState('');
    const canResourceEdit = true; // or control this via user roles

    const addResource = () => {
        if (newResource.trim()) {
            setResources(prev => [...prev, newResource.trim()]);
            setNewResource('');
        }
    };

    const removeResource = (index) => {
        setResources(prev => prev.filter((_, i) => i !== index));
    };

    const editResource = (index) => {
        const current = resources[index];
        const updated = prompt('Edit Resource URL:', current);
        if (updated !== null && updated.trim()) {
            setResources(prev =>
                prev.map((link, i) => (i === index ? updated.trim() : link))
            );
        }
    };

    const canEdit = ['MENTOR', 'ADMIN'].includes(currentUserRole);
    const isMentor = currentUserRole === 'MENTOR';

    const handleDeleteProject = () => {
        if (canEdit) alert('Project deleted');
    };
    const addMember = () => {
        const trimmedName = newMemberName.trim();
        if (!trimmedName) {
            alert('Please enter a valid member name.');
            return;
        }

        const isDuplicate = teamMembers.some(member => member.name.toLowerCase() === trimmedName.toLowerCase());
        if (isDuplicate) {
            alert('Member already exists.');
            return;
        }

        setTeamMembers(prev => [
            ...prev,
            { name: trimmedName, role: newMemberRole }
        ]);

        setNewMemberName('');
        setNewMemberRole('MEMBER');
    };

    const removeMember = index => {
        setTeamMembers(prev => prev.filter((_, i) => i !== index));
    };

    const promoteMember = index => {
        setTeamMembers(prev =>
            prev.map((member, i) => {
                if (i !== index) return member;

                let newRole;
                if (member.role === 'ADMIN') newRole = 'MEMBER';
                else if (member.role === 'MEMBER') newRole = 'ADMIN';
                else newRole = member.role; // Do not change MENTOR role

                return { ...member, role: newRole };
            })
        );
    };

    const addTimeline = () => {
        if (!newTimelineStartDate || !newTimelineEndDate || !newTimelineMilestone.trim()) {
            return alert('Enter start date, end date, and milestone');
        }
        setTimeline(prev => [
            ...prev,
            { startDate: newTimelineStartDate, endDate: newTimelineEndDate, milestone: newTimelineMilestone.trim() },
        ]);
        setNewTimelineStartDate('');
        setNewTimelineEndDate('');
        setNewTimelineMilestone('');
    };

    const removeTimeline = index => {
        setTimeline(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddAchievement = () => {
        if (!newAchStartDate || !newAchEndDate || !newAchText.trim()) {
            alert('Please fill in start date, end date and achievement details.');
            return;
        }
        const newAchievement = {
            startDate: newAchStartDate,
            endDate: newAchEndDate,
            text: newAchText.trim(),
            pdf: newAchPdf || null,
            creator: currentUserName || 'Anonymous',
        };
        setAchievements(prev => [...prev, newAchievement]);
        setNewAchStartDate('');
        setNewAchEndDate('');
        setNewAchText('');
        setNewAchPdf('');
    };

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (!project) return <div className="text-center p-4">There is no project exist.</div>;

    return (
          <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
            <Navbar />
        <div className="bg-whilte dark:bg-gray-900 text-black dark:text-white p-6 rounded shadow mb-6 min-w-5xl mx-auto ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{project.name}</h2>
                <MainButtons
                    title={"← Back"}
                    onClick={() => window.history.back()}
                    className="text-sm text-primary dark:text-white cursor-pointer hover:underline flex items-center"
                />
            </div>

            {/* Team Members */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Team Members</h3>
                <ul className="list-disc list-inside space-y-1">
                    {teamMembers.map((m, i) => (
                        <li key={i} className="flex justify-between items-center">
                            <span>{m.name} - {m.role}</span>
                            {canEdit && (
                                <span className="space-x-2">
                                    <button
                                        className="text-sm text-red-600 underline"
                                        onClick={() => removeMember(i)}
                                    >
                                        Remove
                                    </button>
                                    <button
                                        className="text-sm text-green-600 underline"
                                        onClick={() => promoteMember(i)}
                                        title={m.role === 'ADMIN' ? 'Demote to MEMBER' : 'Promote to ADMIN'}
                                    >
                                        {m.role === 'ADMIN' ? 'Demote' : 'Promote'}
                                    </button>
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
                {canEdit && (
                    <div className="mt-2 flex flex-wrap gap-2 items-center">
                        <input
                            type="text"
                            placeholder="Member Name"
                            className="border rounded px-2 py-1 text-black"
                            value={newMemberName}
                            onChange={e => setNewMemberName(e.target.value)}
                        />
                        <select
                            className="border rounded px-2 py-1 text-black"
                            value={newMemberRole}
                            onChange={e => setNewMemberRole(e.target.value)}
                        >
                            <option value="MEMBER">MEMBER</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="MENTOR">MENTOR</option>
                        </select>
                        <button
                            className="bg-blue-600 text-white px-3 py-1 rounded"
                            onClick={addMember}
                        >
                            Add Member
                        </button>
                    </div>
                )}
            </section>
            {/* time line */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Timeline</h3>
                <ul className="list-disc list-inside space-y-2 mb-4 max-h-72 overflow-auto no-scrollbar">
                    {timeline.map((t, i) => (
                        <li
                            key={i}
                            className="flex justify-between items-center rounded bg-blue-50 px-3 py-2"
                        >
                            <span>
                                <strong>{t.startDate}</strong> to <strong>{t.endDate}</strong> — {t.milestone}
                            </span>
                            {canEdit && (
                                <button
                                    onClick={() => removeTimeline(i)}
                                    className="text-red-600 cursor-pointer p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 transition"
                                    aria-label="Remove timeline"
                                    title="Remove timeline"
                                >
                                    Remove
                                </button>
                            )}
                        </li>
                    ))}
                </ul>

                {canEdit && (
                    <div className="max-w-md p-4  rounded space-y-4 bg-blue-50">
                        <div>
                            <label
                                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
                                htmlFor="startDate"
                            >
                                Start Date
                            </label>
                            <input
                                id="startDate"
                                type="date"
                                value={newTimelineStartDate}
                                onChange={e => setNewTimelineStartDate(e.target.value)}
                                className="w-full rounded border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300" htmlFor="endDate">
                                End Date
                            </label>
                            <input
                                id="endDate"
                                type="date"
                                value={newTimelineEndDate}
                                onChange={e => setNewTimelineEndDate(e.target.value)}
                                className="w-full rounded border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
                                htmlFor="milestone"
                            >
                                Milestone
                            </label>
                            <input
                                id="milestone"
                                type="text"
                                value={newTimelineMilestone}
                                onChange={e => setNewTimelineMilestone(e.target.value)}
                                placeholder="Milestone description"
                                className="w-full rounded border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                            />
                        </div>
                        <button
                            onClick={addTimeline}
                            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition"
                        >
                            Add Timeline
                        </button>
                    </div>
                )}

                {isMentor && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">MENTOR can manage deadlines</p>
                )}
            </section>

            {/* Project Details */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Project Details</h3>
                {canEdit ? (
                    <textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        rows={4}
                        className="w-full resize-y border rounded px-3 py-2 text-black"
                        placeholder="Enter project details..."
                    />
                ) : (
                    <p>{details}</p>
                )}
                {canEdit && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Can edit details and resources
                    </p>
                )}
            </section>

            {/* Resources */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Resources</h3>
                <ul className="list-disc list-inside space-y-1">
                    {resources.map((link, i) => (
                        <li key={i} className="flex justify-between items-center">
                            <span>
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    {link}
                                </a>
                            </span>
                            {canResourceEdit && (
                                <span className="space-x-2">
                                    <button
                                        className="text-sm text-red-600 underline"
                                        onClick={() => removeResource(i)}
                                    >
                                        Remove
                                    </button>
                                    <button
                                        className="text-sm text-green-600 underline"
                                        onClick={() => editResource(i)}
                                    >
                                        Edit
                                    </button>
                                </span>
                            )}
                        </li>
                    ))}
                </ul>

                {canResourceEdit && (
                    <div className="mt-2 flex flex-wrap gap-2 items-center">
                        <input
                            type="text"
                            placeholder="Resource URL"
                            className="border rounded px-2 py-1 text-black w-64"
                            value={newResource}
                            onChange={e => setNewResource(e.target.value)}
                        />
                        <MainButtons
                            className=""
                            onClick={addResource}
                            title="Add Resource"
                        />
                    </div>
                )}
            </section>



            {/* Todo Lists */}
            <section className="mb-6">
                <div className=" mb-2">Todo Lists</div>
                <TodoList />
            </section>

            {/* Achievements */}
            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Achievements</h3>
                <ul className="space-y-2 mb-4 max-h-72 overflow-auto bg-blue-50 no-scrollbar">
                    {achievements.map((ach, i) => (
                        <li key={i} className="border p-4 rounded  ">
                            <p>
                                <strong>Duration:</strong> {ach.startDate} to {ach.endDate}
                            </p>
                            <p>
                                <strong>Details:</strong> {ach.text}
                            </p>
                            <p>
                                <strong>Written by:</strong> {ach.creator || 'Unknown'}
                            </p>
                            {ach.pdf && (
                                <a
                                    href={ach.pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    View PDF
                                </a>
                            )}
                        </li>
                    ))}
                </ul>

                {!isEditAchivementShow && <MainButtons title={"Show edit achivement"} onClick={() => setIsEditAchivementShow(!isEditAchivementShow)} className='' />}
                {isEditAchivementShow &&
                    <div className="border p-4 rounded bg-blue-50  max-w-md space-y-4">
                        <h4 className="font-semibold mb-2">Add Achievement</h4>
                        <div>
                            <label
                                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
                                htmlFor="achStartDate"
                            >
                                Start Date
                            </label>
                            <input
                                id="achStartDate"
                                type="date"
                                value={newAchStartDate}
                                onChange={e => setNewAchStartDate(e.target.value)}
                                className="w-full rounded border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
                                htmlFor="achEndDate"
                            >
                                End Date
                            </label>
                            <input
                                id="achEndDate"
                                type="date"
                                value={newAchEndDate}
                                onChange={e => setNewAchEndDate(e.target.value)}
                                className="w-full rounded border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label
                                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
                                htmlFor="achText"
                            >
                                Achievement Details
                            </label>
                            <textarea
                                id="achText"
                                value={newAchText}
                                onChange={e => setNewAchText(e.target.value)}
                                placeholder="Describe the achievement"
                                className="w-full rounded border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white resize-none"
                            />
                        </div>
                        <div>
                            <label
                                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
                                htmlFor="achPdf"
                            >
                                PDF URL (optional)
                            </label>
                            <input
                                id="achPdf"
                                type="text"
                                value={newAchPdf}
                                onChange={e => setNewAchPdf(e.target.value)}
                                placeholder="https://example.com/achievement.pdf"
                                className="w-full rounded border border-gray-300 dark:border-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white"
                            />
                        </div>
                        <div className='flex justify-center gap-2'>
                            <MainButtons
                                onClick={handleAddAchievement}
                                className=""
                                title="Add Achievement"
                            />
                            {isEditAchivementShow && <MainButtons title={"Hide edit achivement"} onClick={() => setIsEditAchivementShow(!isEditAchivementShow)} className='' />}
                        </div>

                    </div>
                }
            </section>

            {canEdit && (
                <section className="text-right mt-6">
                    <MainButtons
                        title="Delete Project"
                        onClick={handleDeleteProject}
                        className="bg-red-600 text-white p-2 cursor-pointer rounded mt-4 hover:bg-red-700 transition"
                    />
                </section>
            )}
        </div>
        <Footer/>
        </div>
    );
};

export default ProjectManagement;
