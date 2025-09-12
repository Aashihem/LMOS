import React, { useState, useEffect } from 'react';
import { Plus, X, FlaskConical } from 'lucide-react';

export default function FacultyManageBatchesPage() {
    const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
    const [isExperimentModalOpen, setIsExperimentModalOpen] = useState(false);
    const [batchName, setBatchName] = useState('');
    const [labName, setLabName] = useState('');
    const [studentUsernames, setStudentUsernames] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);
    const [facultyBatches, setFacultyBatches] = useState([]);
    const [isLoadingBatches, setIsLoadingBatches] = useState(true);

    // New state for creating experiments
    const [selectedBatchId, setSelectedBatchId] = useState(null);
    const [experimentTitle, setExperimentTitle] = useState('');
    const [experimentDescription, setExperimentDescription] = useState('');
    const [experimentDueDate, setExperimentDueDate] = useState('');

    const facultyUsername = localStorage.getItem('username');

    // **FUNCTION 1: Fetches batches from the backend**
    const fetchFacultyBatches = async () => {
        setIsLoadingBatches(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/batches/faculty/${facultyUsername}`);
            if (!response.ok) {
                throw new Error("Failed to fetch batches.");
            }
            const data = await response.json();
            setFacultyBatches(data);
        } catch (error) {
            console.error("Error fetching faculty batches:", error);
            setMessage({ type: 'error', text: 'Failed to load your batches.' });
        } finally {
            setIsLoadingBatches(false);
        }
    };

    // **React Hook to call the fetch function on component load**
    useEffect(() => {
        if (facultyUsername) {
            fetchFacultyBatches();
        }
    }, [facultyUsername]);

    // **FUNCTION 2: Handles the submission for creating a new batch**
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
            // Re-fetch batches to update the UI
            await fetchFacultyBatches();

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

    // **FUNCTION 3: Handles the submission for creating a new experiment**
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

    const openExperimentModal = (batchId) => {
        setSelectedBatchId(batchId);
        setIsExperimentModalOpen(true);
    };

    return (
        <div className="text-white p-6">
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
                                    onClick={() => openExperimentModal(batch.id)}
                                    className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                                >
                                    <FlaskConical size={18} className="mr-2" /> Create Experiment
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