import React, { useState, useEffect } from 'react';
import { Plus, FlaskConical, Beaker, FileText, BarChart, X } from 'lucide-react';

export default function FacultyExperimentsManagementPage({ navigateTo }) {
    const [experiments, setExperiments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newExperiment, setNewExperiment] = useState({
        title: '', description: '', lab: '', batch: '', due_date: ''
    });

    useEffect(() => {
        fetchExperiments();
    }, []);

    const fetchExperiments = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/experiments/');
            if (!response.ok) throw new Error('Failed to fetch experiments');
            const data = await response.json();
            setExperiments(data);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExperiment(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateExperiment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/experiments/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newExperiment)
            });
            if (!response.ok) throw new Error('Failed to create experiment.');
            setIsModalOpen(false);
            fetchExperiments(); // Refresh the list after creating a new one
        } catch (error) {
            alert(error.message);
        }
    };
    
    // Stats are now dynamic based on fetched data
    const summaryStats = [
        { title: 'Total Experiments', value: experiments.length, icon: FlaskConical },
        { title: 'Active Experiments', value: experiments.filter(e => e.status === 'Active').length, icon: Beaker },
        { title: 'Total Submissions', value: 'N/A', icon: FileText }, // Placeholder
        { title: 'Avg. Completion', value: 'N/A', icon: BarChart }, // Placeholder
    ];

    return (
        <div className="text-white p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Experiments Management</h1>
                    <p className="text-slate-400 text-sm mt-1">Create, manage, and monitor laboratory experiments.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                    <Plus size={18} className="mr-2" /> New Experiment
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {summaryStats.map(stat => (
                    <div key={stat.title} className="bg-slate-800/50 border border-slate-700 p-5 rounded-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-400">{stat.title}</p>
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                        <div className="bg-slate-700/50 p-3 rounded-lg"><stat.icon size={24} className="text-blue-400" /></div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {experiments.map((exp) => (
                    <div key={exp.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-white">{exp.title}</h3>
                            <p className="text-xs text-slate-400">Lab: {exp.lab} | Batch: {exp.batch}</p>
                            <p className="text-xs text-slate-400">Due: {exp.due_date}</p>
                        </div>
                        <div className="flex items-center space-x-3 mt-4">
                            <button className="w-full bg-slate-700 hover:bg-slate-600 text-white text-sm py-2 px-4 rounded-lg">Details</button>
                            <button onClick={() => navigateTo('Submissions', exp.id)} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg">Submissions</button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <form onSubmit={handleCreateExperiment} className="bg-slate-800 p-6 rounded-lg w-full max-w-md border border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Create New Experiment</h2>
                            <button type="button" onClick={() => setIsModalOpen(false)}><X size={20} /></button>
                        </div>
                        <div className="space-y-4">
                            <input name="title" onChange={handleInputChange} placeholder="Experiment Title" required className="w-full bg-slate-700 p-2 rounded" />
                            <textarea name="description" onChange={handleInputChange} placeholder="Description" className="w-full bg-slate-700 p-2 rounded"></textarea>
                            <input name="lab" onChange={handleInputChange} placeholder="Lab (e.g., Electronics Lab 1)" required className="w-full bg-slate-700 p-2 rounded" />
                            <input name="batch" onChange={handleInputChange} placeholder="Batch (e.g., ET2021-A)" required className="w-full bg-slate-700 p-2 rounded" />
                            <input name="due_date" type="date" onChange={handleInputChange} required className="w-full bg-slate-700 p-2 rounded" />
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">Create Experiment</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

