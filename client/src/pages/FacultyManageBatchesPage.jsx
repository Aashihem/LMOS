import React, { useState, useEffect } from 'react';
import { Plus, X, FlaskConical, CheckCircle, Clock } from 'lucide-react';

export default function FacultyManageBatchesPage() {
    // State to manage the view: 'batches', 'experiments', or 'submissions'
    const [view, setView] = useState('batches');

    // States for batch management
    const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
    const [batchName, setBatchName] = useState('');
    const [labName, setLabName] = useState('');
    const [studentUsernames, setStudentUsernames] = useState('');
    const [facultyBatches, setFacultyBatches] = useState([]);

    // States for experiment management
    const [isExperimentModalOpen, setIsExperimentModalOpen] = useState(false);
    const [selectedBatchId, setSelectedBatchId] = useState(null);
    const [selectedBatchName, setSelectedBatchName] = useState('');
    const [experiments, setExperiments] = useState([]);
    const [experimentTitle, setExperimentTitle] = useState('');
    const [experimentDescription, setExperimentDescription] = useState('');
    const [experimentDueDate, setExperimentDueDate] = useState('');
    
    // States for submission management
    const [selectedExperiment, setSelectedExperiment] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [batchStudents, setBatchStudents] = useState([]);


    // General states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingBatches, setIsLoadingBatches] = useState(true);
    const [isLoadingExperiments, setIsLoadingExperiments] = useState(false);
    const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);
    const [message, setMessage] = useState(null);
    
    const facultyUsername = localStorage.getItem('username');

    // Fetch batches when the component mounts or after a batch is created
    const fetchFacultyBatches = async () => {
        setIsLoadingBatches(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/batches/faculty/${facultyUsername}`);
            if (!response.ok) throw new Error("Failed to fetch batches.");
            const data = await response.json();
            setFacultyBatches(data);
        } catch (error) {
            console.error("Error fetching faculty batches:", error);
            setMessage({ type: 'error', text: 'Failed to load your batches.' });
        } finally {
            setIsLoadingBatches(false);
        }
    };

    // Fetch experiments for a specific batch
    const fetchExperimentsForBatch = async (batchId, batchName) => {
        setIsLoadingExperiments(true);
        setSelectedBatchId(batchId);
        setSelectedBatchName(batchName);
        setView('experiments');
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/batches/${batchId}/experiments`);
            if (!response.ok) throw new Error("Failed to fetch experiments.");
            const data = await response.json();
            setExperiments(data);
        } catch (error) {
            console.error("Error fetching experiments:", error);
            setMessage({ type: 'error', text: 'Failed to load experiments.' });
        } finally {
            setIsLoadingExperiments(false);
        }
    };

    // New function to fetch submissions and students for an experiment
    const fetchSubmissionsAndStudents = async (experiment) => {
        setIsLoadingSubmissions(true);
        setSelectedExperiment(experiment);
        setView('submissions');
        try {
            // Fetch submissions
            const submissionsResponse = await fetch(`http://127.0.0.1:8000/api/experiments/${experiment.id}/submissions`);
            if (!submissionsResponse.ok) throw new Error("Failed to fetch submissions.");
            const submissionsData = await submissionsResponse.json();
            setSubmissions(submissionsData);

            // Fetch students for the current batch
            const studentsResponse = await fetch(`http://127.0.0.1:8000/api/batches/${experiment.lab_batch_id}/students`);
            if (!studentsResponse.ok) throw new Error("Failed to fetch students.");
            const studentsData = await studentsResponse.json();
            setBatchStudents(studentsData);

        } catch (error) {
            console.error("Error fetching submissions or students:", error);
            setMessage({ type: 'error', text: 'Failed to load submissions and students.' });
        } finally {
            setIsLoadingSubmissions(false);
        }
    };

    useEffect(() => {
        if (facultyUsername) {
            fetchFacultyBatches();
        }
    }, [facultyUsername]);

    const handleCreateBatch = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);
        
        const students = studentUsernames.split(',').map(s => s.trim()).filter(s => s);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/batches/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: batchName,
                    lab_name: labName,
                    faculty_username: facultyUsername,
                    student_usernames: students
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to create batch.");
            }
            
            setMessage({ type: 'success', text: 'Batch created successfully!' });
            await fetchFacultyBatches(); // Re-fetch to update the list
            
            setTimeout(() => {
                setIsBatchModalOpen(false);
                setBatchName('');
                setLabName('');
                setStudentUsernames('');
                setMessage(null);
            }, 2000);

        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCreateExperiment = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/batches/${selectedBatchId}/experiments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: experimentTitle,
                    description: experimentDescription,
                    due_date: experimentDueDate
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to create experiment.");
            }
            
            setMessage({ type: 'success', text: 'Experiment created successfully!' });
            await fetchExperimentsForBatch(selectedBatchId, selectedBatchName); // Re-fetch to update the list

            setTimeout(() => {
                setIsExperimentModalOpen(false);
                setExperimentTitle('');
                setExperimentDescription('');
                setExperimentDueDate('');
                setMessage(null);
            }, 2000);

        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    const openExperimentModal = () => {
        setIsExperimentModalOpen(true);
    };

    // --- JSX for rendering the different views ---

    const renderBatchesView = () => (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Lab Batches</h1>
                <button onClick={() => setIsBatchModalOpen(true)} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    <Plus size={18} className="mr-2" /> Create New Batch
                </button>
            </div>
            
            {isLoadingBatches ? (
                <p className="text-slate-400 text-center p-8">Loading your batches...</p>
            ) : facultyBatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {facultyBatches.map(batch => (
                        <div key={batch.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-white text-lg">{batch.lab_name} - Batch {batch.name}</h3>
                                <p className="text-sm text-slate-400 mt-2">Students: {batch.students_count}</p>
                            </div>
                            <div className="mt-4 text-right">
                                <button
                                    onClick={() => fetchExperimentsForBatch(batch.id, `${batch.lab_name} - Batch ${batch.name}`)}
                                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                                >
                                    View Experiments
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-slate-500 p-8 bg-slate-800/20 rounded-lg">
                    <p>You have not created any batches yet. Click "Create New Batch" to get started.</p>
                </div>
            )}
        </>
    );

    const renderExperimentsView = () => (
        <>
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => setView('batches')} className="flex items-center text-blue-400 hover:text-blue-300">
                    ← Back to Batches
                </button>
                <h1 className="text-2xl font-bold text-center flex-1">{selectedBatchName}</h1>
                <button onClick={openExperimentModal} className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    <FlaskConical size={18} className="mr-2" /> Create Experiment
                </button>
            </div>

            {isLoadingExperiments ? (
                <p className="text-slate-400 text-center p-8">Loading experiments...</p>
            ) : experiments.length > 0 ? (
                <div className="space-y-4">
                    {experiments.map(exp => (
                        <div key={exp.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-white text-lg">{exp.title}</h3>
                                <p className="text-sm text-slate-400 mt-2">{exp.description}</p>
                                <p className="text-xs text-slate-500 mt-2">Due Date: {exp.due_date}</p>
                            </div>
                            <button
                                onClick={() => fetchSubmissionsAndStudents(exp)}
                                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                                View Submissions
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-slate-500 p-8 bg-slate-800/20 rounded-lg">
                    <p>No experiments have been created for this batch yet.</p>
                </div>
            )}
        </>
    );
    
    // New render function for the submissions view
    const renderSubmissionsView = () => {
        // Map submissions to the student list to show status
        const studentSubmissionStatus = batchStudents.map(student => {
            const submission = submissions.find(sub => sub.student_uid === student.uid);
            return {
                ...student,
                submission: submission
            };
        });

        return (
            <>
                <div className="flex justify-between items-center mb-6">
                    <button onClick={() => setView('experiments')} className="flex items-center text-blue-400 hover:text-blue-300">
                        ← Back to Experiments
                    </button>
                    <h1 className="text-2xl font-bold text-center flex-1">{selectedExperiment.title}</h1>
                </div>

                {isLoadingSubmissions ? (
                    <p className="text-slate-400 text-center p-8">Loading submissions...</p>
                ) : (
                    <div className="space-y-6">
                        {/* List of Submissions */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
                            <h2 className="text-xl font-bold mb-4">All Submissions</h2>
                            {submissions.length > 0 ? (
                                <div className="space-y-3">
                                    {submissions.map(sub => (
                                        <div key={sub.id} className="bg-slate-700/50 p-3 rounded-lg flex justify-between items-center">
                                            <div>
                                                <p className="text-white font-semibold">{sub.student_name}</p>
                                                <p className="text-sm text-slate-400">Submitted on: {new Date(sub.submitted_at).toLocaleString()}</p>
                                            </div>
                                            <p className={`font-bold ${sub.grade ? 'text-green-400' : 'text-yellow-400'}`}>
                                                {sub.grade || 'Awaiting Grade'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-500">No submissions have been made yet.</p>
                            )}
                        </div>

                        {/* Student Submission Status List */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
                            <h2 className="text-xl font-bold mb-4">Student Status</h2>
                            <div className="space-y-3">
                                {studentSubmissionStatus.map(student => (
                                    <div key={student.uid} className="bg-slate-700/50 p-3 rounded-lg flex items-center justify-between">
                                        <p className="text-white">{student.name}</p>
                                        <div className="flex items-center space-x-2">
                                            {student.submission ? (
                                                <>
                                                    <CheckCircle size={18} className="text-green-500" />
                                                    <span className="text-green-400">Submitted</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Clock size={18} className="text-red-500" />
                                                    <span className="text-red-400">Pending</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };

    return (
        <div className="text-white p-6">
            {view === 'batches' && renderBatchesView()}
            {view === 'experiments' && renderExperimentsView()}
            {view === 'submissions' && renderSubmissionsView()}
            
            {isBatchModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <form onSubmit={handleCreateBatch} className="bg-slate-800 p-6 rounded-lg w-full max-w-md border border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Create New Batch</h2>
                            <button type="button" onClick={() => setIsBatchModalOpen(false)}><X size={20}/></button>
                        </div>
                        <div className="space-y-4">
                            <input value={labName} onChange={e => setLabName(e.target.value)} placeholder="Lab Name (e.g., MWC, ED)" required className="w-full bg-slate-700 p-2 rounded text-white" />
                            <input value={batchName} onChange={e => setBatchName(e.target.value)} placeholder="Batch Name (e.g., A3, B4)" required className="w-full bg-slate-700 p-2 rounded text-white" />
                            <textarea value={studentUsernames} onChange={e => setStudentUsernames(e.target.value)} placeholder="Enter student usernames, separated by commas" required className="w-full bg-slate-700 p-2 rounded h-24 text-white"></textarea>
                            {message && <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{message.text}</p>}
                            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded disabled:bg-slate-600">
                                {isSubmitting ? 'Creating...' : 'Create Batch'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {isExperimentModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <form onSubmit={handleCreateExperiment} className="bg-slate-800 p-6 rounded-lg w-full max-w-md border border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Create New Experiment</h2>
                            <button type="button" onClick={() => setIsExperimentModalOpen(false)}><X size={20}/></button>
                        </div>
                        <div className="space-y-4">
                            <input value={experimentTitle} onChange={e => setExperimentTitle(e.target.value)} placeholder="Experiment Title" required className="w-full bg-slate-700 p-2 rounded text-white" />
                            <textarea value={experimentDescription} onChange={e => setExperimentDescription(e.target.value)} placeholder="Experiment Description" required className="w-full bg-slate-700 p-2 rounded h-24 text-white"></textarea>
                            <input type="date" value={experimentDueDate} onChange={e => setExperimentDueDate(e.target.value)} required className="w-full bg-slate-700 p-2 rounded text-white" />
                            {message && <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{message.text}</p>}
                            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded disabled:bg-slate-600">
                                {isSubmitting ? 'Creating...' : 'Create Experiment'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}