import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function FacultySubmissionsPage({ experimentId, navigateTo }) {
    const [submissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (experimentId) {
            fetchSubmissions();
        }
    }, [experimentId]);

    const fetchSubmissions = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/experiments/${experimentId}/submissions`);
            if (!response.ok) {
                throw new Error('Failed to fetch submissions.');
            }
            const data = await response.json();
            setSubmissions(data);
        } catch (error) {
            console.error("Failed to fetch submissions:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="text-white p-6">
            <button 
                onClick={() => navigateTo('Experiments Management')} 
                className="flex items-center text-sm text-slate-400 hover:text-white mb-4 transition-colors"
            >
                <ArrowLeft size={16} className="mr-2" /> Back to Experiments
            </button>
            <h1 className="text-2xl font-bold mb-6">Experiment Submissions</h1>

            <div className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-800">
                            <tr>
                                <th className="px-6 py-3">Student Name</th>
                                <th className="px-6 py-3">Submission Date & Time</th>
                                <th className="px-6 py-3">Grade</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {isLoading ? (
                                <tr><td colSpan="4" className="text-center py-8 text-slate-400">Loading submissions...</td></tr>
                            ) : error ? (
                                <tr><td colSpan="4" className="text-center py-8 text-red-400">{error}</td></tr>
                            ) : submissions.length > 0 ? (
                                submissions.map(sub => (
                                    <tr key={sub.id} className="hover:bg-slate-700/50 transition-colors">
                                        <td className="px-6 py-4 font-medium">{sub.student_name}</td>
                                        <td className="px-6 py-4">{new Date(sub.submitted_at).toLocaleString()}</td>
                                        <td className="px-6 py-4">{sub.grade || 'Not Graded'}</td>
                                        <td className="px-6 py-4">
                                            <button className="text-blue-400 hover:underline">View & Grade</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" className="text-center py-8 text-slate-500">No submissions found for this experiment.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

