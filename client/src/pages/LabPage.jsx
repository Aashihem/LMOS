import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';

export default function LabPage({ navigateTo }) {
    const [batches, setBatches] = useState([]);
    const [experiments, setExperiments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState('batches');
    const [currentBatch, setCurrentBatch] = useState(null);
    const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
    const [selectedExperimentId, setSelectedExperimentId] = useState(null);
    const username = localStorage.getItem('username');

    useEffect(() => {
        if (username) {
            fetchBatches();
        } else {
            setIsLoading(false);
        }
    }, [username]);

    const fetchBatches = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/batches/student/${username}`);
            if (!response.ok) throw new Error('Could not fetch your lab batches.');
            const data = await response.json();
            setBatches(data);
        } catch (error) {
            console.error("Failed to fetch batches:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const fetchExperiments = async (batchId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/batches/${batchId}/experiments`);
            if (!response.ok) throw new Error('Could not fetch experiments.');
            const data = await response.json();
            setExperiments(data);
            setView('experiments');
        } catch (error) {
            console.error("Failed to fetch experiments:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBatchClick = (batch) => {
        setCurrentBatch(batch);
        fetchExperiments(batch.id);
    };

    // Placeholder for the submission function (frontend only for now)
    const handleSubmission = () => {
        console.log(`Submitting experiment with ID: ${selectedExperimentId}`);
        setIsSubmissionModalOpen(false);
        // You would add the API call to the backend here in the future
    };

    const renderBatches = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.length > 0 ? batches.map(batch => (
                <div 
                    key={batch.id} 
                    onClick={() => handleBatchClick(batch)}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 cursor-pointer hover:border-blue-500 transition-all transform hover:scale-105"
                >
                    <h3 className="font-bold text-white text-lg">{batch.lab_name} - Batch {batch.name}</h3>
                    <p className="text-sm text-slate-400 mt-4">Click to view experiments</p>
                </div>
            )) : (
                <p className="text-slate-500 col-span-full">You are not yet enrolled in any lab batches.</p>
            )}
        </div>
    );

    const renderExperiments = () => (
        <div className="space-y-4">
            <button onClick={() => setView('batches')} className="text-sm text-blue-400 hover:text-blue-300">
                ← Back to Batches
            </button>
            <h2 className="text-xl font-bold">{currentBatch.lab_name} - Batch {currentBatch.name} Experiments</h2>
            {experiments.length > 0 ? experiments.map(exp => (
                <div key={exp.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-white text-lg">{exp.title}</h3>
                        <p className="text-sm text-slate-400 mt-2">{exp.description}</p>
                        <p className="text-xs text-slate-500 mt-2">Due Date: {exp.due_date}</p>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setSelectedExperimentId(exp.id);
                                setIsSubmissionModalOpen(true);
                            }}
                            className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                            <CheckCircle size={18} className="mr-2" /> Submit
                        </button>
                    </div>
                </div>
            )) : (
                <p className="text-slate-500">No experiments have been created for this batch yet.</p>
            )}
        </div>
    );

    return (
        <div className="text-white p-6">
            <h1 className="text-2xl font-bold mb-6">Lab Submissions</h1>
            {isLoading ? (
                <p className="text-slate-400">Loading...</p>
            ) : (
                view === 'batches' ? renderBatches() : renderExperiments()
            )}
            
            {isSubmissionModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-slate-800 p-6 rounded-lg w-full max-w-sm border border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Confirm Submission</h2>
                            <button type="button" onClick={() => setIsSubmissionModalOpen(false)}><X size={20}/></button>
                        </div>
                        <p className="text-slate-400">Are you sure you want to submit this experiment?</p>
                        <div className="mt-6 flex justify-end space-x-4">
                            <button
                                onClick={() => setIsSubmissionModalOpen(false)}
                                className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmission}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}