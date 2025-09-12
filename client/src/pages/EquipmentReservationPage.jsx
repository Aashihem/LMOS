import React, { useState, useEffect } from 'react';
import { Plus, X, Search, AlertCircle } from 'lucide-react';

// Reusable component for status badges
const StatusBadge = ({ status }) => {
    const colors = {
      Pending: 'bg-yellow-500/20 text-yellow-400',
      Approved: 'bg-green-500/20 text-green-400',
      Rejected: 'bg-red-500/20 text-red-400',
    };
    return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colors[status] || 'bg-slate-500/20'}`}>{status}</span>;
};

export default function EquipmentReservationPage() {
    const [availableEquipment, setAvailableEquipment] = useState([]);
    const [myReservations, setMyReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Form state for new reservation
    const [selectedEquipment, setSelectedEquipment] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null);
    
    const username = localStorage.getItem('username');

    // Fetch both equipment and user's reservations on component load
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch available equipment
                const equipResponse = await fetch('http://127.0.0.1:8000/api/equipment');
                if (!equipResponse.ok) throw new Error('Could not fetch equipment list.');
                const equipData = await equipResponse.json();
                setAvailableEquipment(equipData);

                // Fetch user's reservations
                if (username) {
                    const resResponse = await fetch(`http://127.0.0.1:8000/api/reservations/my-requests/${username}`);
                    if (!resResponse.ok) throw new Error('Could not fetch your reservations.');
                    const resData = await resResponse.json();
                    setMyReservations(resData);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [username]); // Refetch if username changes (e.g., on login)

    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    equipment: selectedEquipment,
                    start_date: startDate,
                    end_date: endDate,
                }),
            });
            if (!response.ok) throw new Error('Reservation request failed.');
            
            setSubmitMessage({ type: 'success', text: 'Reservation submitted successfully!' });
            // Refetch reservations to show the new pending request
            const resResponse = await fetch(`http://127.0.0.1:8000/api/reservations/my-requests/${username}`);
            const resData = await resResponse.json();
            setMyReservations(resData);
            
            setTimeout(() => {
                setIsModalOpen(false);
                setSubmitMessage(null);
                // Reset form
                setSelectedEquipment('');
                setStartDate('');
                setEndDate('');
            }, 2000);
        } catch (err) {
            setSubmitMessage({ type: 'error', text: err.message });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const filteredEquipment = availableEquipment.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="text-white p-6 md:p-8">
            <h1 className="text-2xl font-bold text-slate-100 mb-2">Equipment Reservation</h1>
            <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6"></div>
            
            {/* Available Equipment Section */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Available Equipment</h2>
                    <button onClick={() => setIsModalOpen(true)} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                        <Plus size={18} className="mr-2" /> Request Reservation
                    </button>
                </div>
                
                <div className="relative mb-4">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Search equipment by name or ID"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {isLoading && <p className="text-slate-400">Loading equipment...</p>}
                {error && <p className="text-red-400 flex items-center"><AlertCircle size={16} className="mr-2"/>Error: {error}</p>}
                {!isLoading && !error && (
                    <div className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-400 uppercase bg-slate-800">
                                    <tr>
                                        <th className="px-6 py-3">Item ID</th>
                                        <th className="px-6 py-3">Name</th>
                                        <th className="px-6 py-3">Type</th>
                                        <th className="px-6 py-3">Availability</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {filteredEquipment.map(item => (
                                        <tr key={item.id} className="hover:bg-slate-700/50">
                                            <td className="px-6 py-4 text-slate-400">{item.id}</td>
                                            <td className="px-6 py-4 font-medium">{item.name}</td>
                                            <td className="px-6 py-4 text-slate-400">{item.type}</td>
                                            <td className="px-6 py-4 text-green-400 font-semibold">{item.availability}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            
            {/* User's Reservation Requests */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Your Reservation Requests</h2>
                <div className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700">
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-400 uppercase bg-slate-800">
                                <tr>
                                    <th className="px-6 py-3">Equipment</th>
                                    <th className="px-6 py-3">Start Date & Time</th>
                                    <th className="px-6 py-3">End Date & Time</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {myReservations.map(req => (
                                    <tr key={req.reservation_id} className="hover:bg-slate-700/50">
                                        <td className="px-6 py-4 font-medium">{req.equipment}</td>
                                        <td className="px-6 py-4 text-slate-400">{new Date(req.start_date).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-slate-400">{new Date(req.end_date).toLocaleString()}</td>
                                        <td className="px-6 py-4"><StatusBadge status={req.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Reservation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md border border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">New Reservation Request</h2>
                            <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleRequestSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Equipment</label>
                                <select value={selectedEquipment} onChange={e => setSelectedEquipment(e.target.value)} required className="w-full bg-slate-700 p-2 rounded border border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none">
                                    <option value="" disabled>Select Equipment</option>
                                    {availableEquipment.map(eq => <option key={eq.id} value={eq.name}>{eq.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Start Date & Time</label>
                                <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} required className="w-full bg-slate-700 p-2 rounded border border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">End Date & Time</label>
                                <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} required className="w-full bg-slate-700 p-2 rounded border border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            {submitMessage && (
                                <p className={`text-sm ${submitMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{submitMessage.text}</p>
                            )}
                            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded disabled:bg-slate-600">
                                {isSubmitting ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

