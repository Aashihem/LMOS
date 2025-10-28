import React, { useState, useEffect } from 'react';
import { Plus, X, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'; // Added icons

export default function FacultyEquipmentManagementPage() {
    // --- State for Equipment Inventory ---
    const [equipmentList, setEquipmentList] = useState([]);
    const [isLoadingEquipment, setIsLoadingEquipment] = useState(true);
    const [equipmentError, setEquipmentError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [equipmentId, setEquipmentId] = useState('');
    const [equipmentName, setEquipmentName] = useState('');
    const [availableUnits, setAvailableUnits] = useState('');
    const [message, setMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- State for Pending Reservation Requests ---
    const [pendingRequests, setPendingRequests] = useState([]);
    const [isLoadingRequests, setIsLoadingRequests] = useState(true);
    const [requestsError, setRequestsError] = useState(null);

    // --- Fetch Data on Mount ---
    useEffect(() => {
        fetchEquipment();
        fetchPendingRequests();
    }, []);

    // --- Functions for Equipment Inventory ---
    const fetchEquipment = async () => {
        setIsLoadingEquipment(true);
        setEquipmentError(null);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/equipment/');
            if (!response.ok) throw new Error("Failed to fetch equipment list.");
            const data = await response.json();
            setEquipmentList(data);
        } catch (error) {
            console.error("Error fetching equipment:", error);
            setEquipmentError('Failed to load equipment list.');
        } finally {
            setIsLoadingEquipment(false);
        }
    };

    const handleAddEquipment = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/equipment/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    equipment_id: equipmentId,
                    equipment_name: equipmentName,
                    available_units: parseInt(availableUnits)
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to add equipment.");
            }
            setMessage({ type: 'success', text: 'Equipment added successfully!' });
            await fetchEquipment(); // Refresh list
            setTimeout(() => { // Close modal after delay
                setIsModalOpen(false);
                setEquipmentId('');
                setEquipmentName('');
                setAvailableUnits('');
                setMessage(null);
            }, 1500);
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Functions for Reservation Requests ---
    const fetchPendingRequests = async () => {
        setIsLoadingRequests(true);
        setRequestsError(null);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/reservations/pending');
            if (!response.ok) throw new Error('Failed to fetch pending requests.');
            const data = await response.json();
            setPendingRequests(data);
        } catch (err) {
            setRequestsError(err.message);
        } finally {
            setIsLoadingRequests(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await fetch(`http://127.0.0.1:8000/api/reservations/${id}/approve`, { method: 'PATCH' });
            setPendingRequests(pendingRequests.filter(req => req.reservation_id !== id)); // Update UI
        } catch (err) { alert('Failed to approve request.'); }
    };

    const handleReject = async (id) => {
        try {
            await fetch(`http://127.0.0.1:8000/api/reservations/${id}/reject`, { method: 'PATCH' });
            setPendingRequests(pendingRequests.filter(req => req.reservation_id !== id)); // Update UI
        } catch (err) { alert('Failed to reject request.'); }
    };

    return (
        <div className="text-white p-6 md:p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">Equipment Management</h1>
                    <p className="text-sm text-slate-400">Review requests and manage lab equipment inventory.</p>
                </div>
                <button
                    onClick={() => { setIsModalOpen(true); setMessage(null); }} // Clear message when opening modal
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                    <Plus size={18} className="mr-2" /> Add Equipment
                </button>
            </div>

            {/* Decorative top bar */}
            <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>

            {/* --- NEW: Pending Requests Section --- */}
            <div className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700">
                <div className="p-4 border-b border-slate-700">
                    <h2 className="font-semibold text-white">Pending Reservation Requests</h2>
                </div>
                {isLoadingRequests && <p className="p-6 text-slate-400 animate-pulse">Loading requests...</p>}
                {requestsError && <p className="p-6 text-red-400 flex items-center"><AlertCircle size={16} className="mr-2" />Error: {requestsError}</p>}

                {!isLoadingRequests && !requestsError && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-300">
                            <thead className="text-xs text-slate-400 uppercase bg-slate-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Student</th>
                                    <th scope="col" className="px-6 py-3">Equipment</th>
                                    <th scope="col" className="px-6 py-3">Start Date & Time</th>
                                    <th scope="col" className="px-6 py-3">End Date & Time</th>
                                    <th scope="col" className="px-6 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {pendingRequests.length > 0 ? pendingRequests.map((req) => (
                                    <tr key={req.reservation_id} className="hover:bg-slate-700/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">{req.student_name}</td>
                                        <td className="px-6 py-4">{req.equipment}</td>
                                        <td className="px-6 py-4">{new Date(req.start_date).toLocaleString()}</td>
                                        <td className="px-6 py-4">{new Date(req.end_date).toLocaleString()}</td>
                                        <td className="px-6 py-4 flex items-center justify-center space-x-2">
                                            <button
                                                onClick={() => handleApprove(req.reservation_id)}
                                                className="flex items-center text-xs bg-green-500/20 hover:bg-green-500/40 text-green-400 py-1 px-3 rounded-full transition-colors"
                                            >
                                                <CheckCircle2 size={14} className="mr-1" /> Approve
                                            </button>
                                            <button
                                                onClick={() => handleReject(req.reservation_id)}
                                                className="flex items-center text-xs bg-red-500/20 hover:bg-red-500/40 text-red-400 py-1 px-3 rounded-full transition-colors"
                                            >
                                                <XCircle size={14} className="mr-1" /> Reject
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="5" className="text-center py-8 text-slate-500">No pending reservation requests found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* --- EXISTING: Equipment Inventory Section --- */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Equipment Inventory</h2>
                {isLoadingEquipment && <p className="text-slate-400 text-center p-8 animate-pulse">Loading inventory...</p>}
                {equipmentError && <p className="text-red-400 text-center p-8">{equipmentError}</p>}
                {!isLoadingEquipment && !equipmentError && (
                    equipmentList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {equipmentList.map(equipment => (
                                <div key={equipment.equipment_id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
                                    <h3 className="font-bold text-white text-lg">{equipment.equipment_name}</h3>
                                    <p className="text-sm text-slate-400 mt-2">ID: {equipment.equipment_id}</p>
                                    <p className="text-sm text-slate-400 mt-2">Available: {equipment.available_units}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 p-8 bg-slate-800/20 rounded-lg">
                            <p>No equipment has been added yet. Click "Add Equipment" to get started.</p>
                        </div>
                    )
                )}
            </div>

            {/* Add Equipment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <form onSubmit={handleAddEquipment} className="bg-slate-800 p-6 rounded-lg w-full max-w-md border border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Add New Equipment</h2>
                            <button type="button" onClick={() => setIsModalOpen(false)}><X size={20} /></button>
                        </div>
                        <div className="space-y-4">
                            <input value={equipmentId} onChange={e => setEquipmentId(e.target.value)} placeholder="Equipment ID (e.g., OSC001)" required className="w-full bg-slate-700 p-2 rounded text-white border border-slate-600 focus:ring-blue-500" />
                            <input value={equipmentName} onChange={e => setEquipmentName(e.target.value)} placeholder="Equipment Name (e.g., Oscilloscope)" required className="w-full bg-slate-700 p-2 rounded text-white border border-slate-600 focus:ring-blue-500" />
                            <input type="number" value={availableUnits} onChange={e => setAvailableUnits(e.target.value)} placeholder="Available Units" required min="0" className="w-full bg-slate-700 p-2 rounded text-white border border-slate-600 focus:ring-blue-500" />
                            {message && <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{message.text}</p>}
                            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded disabled:bg-slate-600">
                                {isSubmitting ? 'Adding...' : 'Add Equipment'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

