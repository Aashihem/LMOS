// pages/EquipmentIdentificationPage.js
import { useState } from 'react';
import { Search, Camera, Info, MapPin } from 'lucide-react';

export default function EquipmentIdentificationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [scanMode, setScanMode] = useState(false);

  // Mock data for equipment
  const equipmentDatabase = [
    {
      id: 'EQP-1004',
      name: 'Digital Oscilloscope Model DS1',
      type: 'Oscilloscope',
      manufacturer: 'Tektronix',
      location: 'LAB 304',
      lastCalibration: '2024-09-15',
      nextCalibration: '2025-09-15',
      status: 'Operational'
    },
    {
      id: 'EQP-1008',
      name: 'Spectrum Analyzer Model SA1',
      type: 'Spectrum Analyzer',
      manufacturer: 'Keysight',
      location: 'LAB 306',
      lastCalibration: '2024-10-05',
      nextCalibration: '2025-04-05',
      status: 'Operational'
    },
    {
      id: 'EQP-1012',
      name: 'Power Supply Model PS1',
      type: 'Power Supply',
      manufacturer: 'ITECH',
      location: 'LAB 304',
      lastCalibration: '2024-08-20',
      nextCalibration: '2025-02-20',
      status: 'Maintenance Required'
    },
    {
      id: 'EQP-1016',
      name: 'DMM Model M123',
      type: 'DMM',
      manufacturer: 'Fluke',
      location: 'LAB 304',
      lastCalibration: '2024-11-01',
      nextCalibration: '2025-05-01',
      status: 'Operational'
    },
    {
      id: 'EQP-1020',
      name: 'Function Generator Model FG1',
      type: 'Function Generator',
      manufacturer: 'Rigol',
      location: 'LAB 306',
      lastCalibration: '2024-07-12',
      nextCalibration: '2025-01-12',
      status: 'Operational'
    }
  ];

  // Filter equipment based on search query
  const filteredEquipment = equipmentDatabase.filter(equip => 
    equip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    equip.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    equip.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    equip.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    equip.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Selected equipment details (for demonstration purposes)
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const viewEquipmentDetails = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const closeEquipmentDetails = () => {
    setSelectedEquipment(null);
  };

  // Status badge color mapping
  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'operational':
        return 'bg-green-500/20 text-green-400';
      case 'maintenance required':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'out of service':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">Equipment Identification</h1>
      
      {/* Search and Scan Controls */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-grow max-w-xl">
            <input
              type="text"
              placeholder="Search equipment by ID, name, type, or location"
              className="w-full pl-10 pr-4 py-2 rounded bg-[#1e293b] border border-[#334155] focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={scanMode}
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <span className="text-gray-400">OR</span>
          
          <button
            className={`py-2 px-4 rounded flex items-center gap-2 transition-colors ${
              scanMode 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            onClick={() => setScanMode(!scanMode)}
          >
            <Camera size={18} />
            <span>{scanMode ? 'Cancel Scan' : 'Scan QR Code'}</span>
          </button>
        </div>
        
        {/* Scan Area (shown only when scan mode is active) */}
        {scanMode && (
          <div className="mt-4 bg-[#1e293b] border border-dashed border-[#334155] rounded p-8 flex flex-col items-center justify-center">
            <div className="w-64 h-64 border-2 border-blue-500 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500/5"></div>
              <div className="w-48 h-48 border border-blue-400/30"></div>
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500"></div>
              <div className="text-gray-400 text-sm text-center">Position QR code within the frame</div>
            </div>
            <p className="mt-4 text-gray-400 text-sm">Camera access required. Please allow when prompted.</p>
          </div>
        )}
      </div>
      
      {/* Equipment List */}
      {!scanMode && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEquipment.length > 0 ? (
            filteredEquipment.map((equipment) => (
              <div 
                key={equipment.id}
                className="bg-[#1e293b] border border-[#334155] rounded p-4 hover:border-blue-500/50 transition-colors cursor-pointer"
                onClick={() => viewEquipmentDetails(equipment)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{equipment.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusBadgeColor(equipment.status)}`}>
                    {equipment.status}
                  </span>
                </div>
                <div className="text-sm text-gray-300 mb-4">ID: {equipment.id}</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Info size={14} className="text-gray-400" />
                    <span>{equipment.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-400" />
                    <span>{equipment.location}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-8 bg-[#1e293b] border border-[#334155] rounded">
              <p className="text-gray-400">No equipment found matching your search criteria.</p>
            </div>
          )}
        </div>
      )}
      
      {/* Equipment Details Modal */}
      {selectedEquipment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0f172a] border border-[#334155] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold">{selectedEquipment.name}</h2>
                  <p className="text-blue-400">{selectedEquipment.id}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusBadgeColor(selectedEquipment.status)}`}>
                  {selectedEquipment.status}
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Equipment Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type</span>
                      <span>{selectedEquipment.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Manufacturer</span>
                      <span>{selectedEquipment.manufacturer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location</span>
                      <span>{selectedEquipment.location}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Calibration Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Calibration</span>
                      <span>{selectedEquipment.lastCalibration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next Calibration</span>
                      <span>{selectedEquipment.nextCalibration}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between gap-4">
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex-1"
                  onClick={() => console.log('Request Maintenance', selectedEquipment.id)}
                >
                  Request Maintenance
                </button>
                <button 
                  className="bg-[#334155] hover:bg-[#475569] text-white py-2 px-4 rounded flex-1"
                  onClick={closeEquipmentDetails}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}