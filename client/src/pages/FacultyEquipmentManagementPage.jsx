import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

export default function FacultyEquipmentManagementPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [equipmentId, setEquipmentId] = useState('');
    const [equipmentName, setEquipmentName] = useState('');
    const [availableUnits, setAvailableUnits] = useState('');
    const [message, setMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [equipmentList, setEquipmentList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchEquipment = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/equipment/');
            if (!response.ok) throw new Error("Failed to fetch equipment list.");
            const data = await response.json();
            setEquipmentList(data);
        } catch (error) {
            console.error("Error fetching equipment:", error);
            setMessage({ type: 'error', text: 'Failed to load equipment list.' });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEquipment();
    }, []);

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
            await fetchEquipment(); // Refresh the list
            
            setTimeout(() => {
                setIsModalOpen(false);
                setEquipmentId('');
                setEquipmentName('');
                setAvailableUnits('');
                setMessage(null);
            }, 2000);

        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="text-white p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Equipment Management</h1>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                    <Plus size={18} className="mr-2" /> Add Equipment
                </button>
            </div>
            
            {isLoading ? (
                <p className="text-slate-400 text-center p-8">Loading equipment...</p>
            ) : equipmentList.length > 0 ? (
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
            )}
            
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <form onSubmit={handleAddEquipment} className="bg-slate-800 p-6 rounded-lg w-full max-w-md border border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Add New Equipment</h2>
                            <button type="button" onClick={() => setIsModalOpen(false)}><X size={20}/></button>
                        </div>
                        <div className="space-y-4">
                            <input value={equipmentId} onChange={e => setEquipmentId(e.target.value)} placeholder="Equipment ID (e.g., OSC001)" required className="w-full bg-slate-700 p-2 rounded text-white" />
                            <input value={equipmentName} onChange={e => setEquipmentName(e.target.value)} placeholder="Equipment Name (e.g., Oscilloscope)" required className="w-full bg-slate-700 p-2 rounded text-white" />
                            <input type="number" value={availableUnits} onChange={e => setAvailableUnits(e.target.value)} placeholder="Available Units" required className="w-full bg-slate-700 p-2 rounded text-white" />
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