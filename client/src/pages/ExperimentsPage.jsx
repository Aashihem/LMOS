import React, { useState, useEffect } from 'react';

export default function ExperimentsPage({ navigateTo }) {
    const [experiments, setExperiments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchExperiments();
    }, []);

    const fetchExperiments = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/experiments');
            const data = await response.json();
            setExperiments(data);
        } catch (error) {
            console.error("Failed to fetch experiments:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="text-white p-6">
            <h1 className="text-2xl font-bold mb-6">Available Experiments</h1>

            {isLoading ? (
                <p>Loading experiments...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {experiments.map(exp => (
                        <div key={exp.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
                            <h3 className="font-bold text-white text-lg mb-2">{exp.title}</h3>
                            <p className="text-sm text-slate-400 mb-1">Lab: {exp.lab}</p>
                            <p className="text-sm text-slate-400 mb-4">Due Date: {exp.due_date}</p>
                            <button 
                                // This would navigate to a detailed view or submission modal
                                // onClick={() => navigateTo('ExperimentDetail', exp.id)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg"
                            >
                                View & Submit
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
