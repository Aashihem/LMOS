import { useState } from 'react';
import { Plus, X } from 'lucide-react';

export default function EquipmentReservationPage() {
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [reservationRequests, setReservationRequests] = useState([
    {
      id: 1,
      equipment: 'Digital Oscilloscope Model DS1',
      startDateTime: '5/13/2025, 10:00 AM',
      endDateTime: '5/13/2025, 12:00 PM',
      status: 'Pending',
    },
    {
      id: 2,
      equipment: 'Function Generator Model FG1',
      startDateTime: '5/14/2025, 02:00 PM',
      endDateTime: '5/14/2025, 04:00 PM',
      status: 'Pending',
    },
    {
      id: 3,
      equipment: 'Power Supply Model PS1',
      startDateTime: '5/15/2025, 09:00 AM',
      endDateTime: '5/15/2025, 11:00 AM',
      status: 'Pending',
    },
    {
      id: 4,
      equipment: 'DMM Model M123',
      startDateTime: '5/16/2025, 01:00 PM',
      endDateTime: '5/16/2025, 03:00 PM',
      status: 'Pending',
    },
  ]);

  const [newReservation, setNewReservation] = useState({
    equipment: '',
    startDateTime: '',
    endDateTime: '',
  });

  const availableEquipment = [
    { id: 'EQP-1004', name: 'Digital Oscilloscope Model DS1', type: 'Oscilloscope', availability: 'Available' },
    { id: 'EQP-1008', name: 'Spectrum Analyzer Model SA1', type: 'Spectrum Analyzer', availability: 'Available' },
    { id: 'EQP-1012', name: 'Power Supply Model PS1', type: 'Power Supply', availability: 'Available' },
    { id: 'EQP-1016', name: 'DMM Model M123', type: 'DMM', availability: 'Available' },
    { id: 'EQP-1020', name: 'Function Generator Model FG1', type: 'Function Generator', availability: 'Available' },
    { id: 'EQP-1024', name: 'Function Generator Model FG2', type: 'Function Generator', availability: 'Available' },
    { id: 'EQP-1028', name: 'Spectrum Analyzer Model SA2', type: 'Spectrum Analyzer', availability: 'Available' },
    { id: 'EQP-1032', name: 'Power Supply Model PS2', type: 'Power Supply', availability: 'Available' },
    { id: 'EQP-1036', name: 'DMM Model M456', type: 'DMM', availability: 'Available' },
    { id: 'EQP-1040', name: 'Oscilloscope Model OS2', type: 'Oscilloscope', availability: 'Available' },
    { id: 'EQP-1044', name: 'Function Generator Model FG3', type: 'Function Generator', availability: 'Available' },
    { id: 'EQP-1048', name: 'Spectrum Analyzer Model SA3', type: 'Spectrum Analyzer', availability: 'Available' },
  ];

  const filteredEquipment = availableEquipment.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase()) ||
    item.id.toLowerCase().includes(filter.toLowerCase())
  );

  const filteredReservations =
    statusFilter === 'all'
      ? reservationRequests
      : reservationRequests.filter((req) => req.status.toLowerCase() === statusFilter.toLowerCase());

  const handleNewReservationSubmit = (e) => {
    e.preventDefault();
    const newReservationWithId = {
      ...newReservation,
      id: reservationRequests.length + 1, // Generate a new ID
      status: 'Pending',
    };
    setReservationRequests([...reservationRequests, newReservationWithId]);
    setIsModalOpen(false); // Close the modal
    setNewReservation({ equipment: '', startDateTime: '', endDateTime: '' }); // Reset the form
  };

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">Equipment Reservation</h1>

      {/* Available Equipment Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Available Equipment</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center gap-2 transition-colors"
            onClick={() => setIsModalOpen(true)} // Open the modal
          >
            <Plus size={18} />
            <span>Request Reservation</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search equipment by name or ID"
            className="w-full p-2 rounded bg-[#1e293b] border border-[#334155] focus:outline-none focus:border-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        {/* Equipment table */}
        <div className="bg-[#1e293b] rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#334155] text-left text-sm uppercase font-semibold">
                  <th className="px-4 py-3 text-gray-300">Item ID</th>
                  <th className="px-4 py-3 text-gray-300">Name</th>
                  <th className="px-4 py-3 text-gray-300">Type</th>
                  <th className="px-4 py-3 text-gray-300">Availability</th>
                </tr>
              </thead>
              <tbody>
                {filteredEquipment.map((item) => (
                  <tr key={item.id} className="border-t border-[#334155] hover:bg-[#2d3748]">
                    <td className="px-4 py-3 text-gray-300">{item.id}</td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3 text-gray-300">{item.type}</td>
                    <td className="px-4 py-3 text-green-400">{item.availability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Your Reservation Requests Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Reservation Requests</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Filter by status:</span>
            <select
              className="bg-[#1e293b] border border-[#334155] rounded p-1 text-sm focus:outline-none focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Reservations table */}
        <div className="bg-[#1e293b] rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#334155] text-left text-sm uppercase font-semibold">
                  <th className="px-4 py-3 text-gray-300">Equipment</th>
                  <th className="px-4 py-3 text-gray-300">Start Date & Time</th>
                  <th className="px-4 py-3 text-gray-300">End Date & Time</th>
                  <th className="px-4 py-3 text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((req) => (
                  <tr key={req.id} className="border-t border-[#334155] hover:bg-[#2d3748]">
                    <td className="px-4 py-3">{req.equipment}</td>
                    <td className="px-4 py-3 text-gray-300">{req.startDateTime}</td>
                    <td className="px-4 py-3 text-gray-300">{req.endDateTime}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Reservation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Request New Reservation</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-200">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleNewReservationSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400">Equipment</label>
                <select
                  value={newReservation.equipment}
                  onChange={(e) => setNewReservation({ ...newReservation, equipment: e.target.value })}
                  className="w-full p-2 rounded bg-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Equipment</option>
                  {availableEquipment.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400">Start Date & Time</label>
                <input
                  type="datetime-local"
                  value={newReservation.startDateTime}
                  onChange={(e) => setNewReservation({ ...newReservation, startDateTime: e.target.value })}
                  className="w-full p-2 rounded bg-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400">End Date & Time</label>
                <input
                  type="datetime-local"
                  value={newReservation.endDateTime}
                  onChange={(e) => setNewReservation({ ...newReservation, endDateTime: e.target.value })}
                  className="w-full p-2 rounded bg-[#334155] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}