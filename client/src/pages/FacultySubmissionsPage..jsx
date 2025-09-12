import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function FacultySubmissionsPage({ experimentId, navigateTo }) {
    const [submissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (experimentId) {
            fetchSubmissions();
        }
    }, [experimentId]);

    const fetchSubmissions = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/experiments/${experimentId}/submissions`);
            const data = await response.json();
            setSubmissions(data);
        } catch (error) {
            console.error("Failed to fetch submissions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="text-white p-6">
            <button onClick={() => navigateTo('Experiments Management')} className="flex items-center text-sm text-slate-400 hover:text-white mb-4">
                <ArrowLeft size={16} className="mr-2" /> Back to Experiments
            </button>
            <h1 className="text-2xl font-bold mb-6">Experiment Submissions</h1>

            <div className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-400 uppercase bg-slate-800">
                        <tr>
                            <th className="px-6 py-3">Student Name</th>
                            <th className="px-6 py-3">Submission Date</th>
                            <th className="px-6 py-3">Grade</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {isLoading ? (
                            <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
                        ) : (
                            submissions.map(sub => (
                                <tr key={sub.id} className="hover:bg-slate-700/50">
                                    <td className="px-6 py-4 font-medium">{sub.student_name}</td>
                                    <td className="px-6 py-4">{new Date(sub.submitted_at).toLocaleString()}</td>
                                    <td className="px-6 py-4">{sub.grade || 'Not Graded'}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-400 hover:underline">View & Grade</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
