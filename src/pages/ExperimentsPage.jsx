import { useState } from 'react';
import { Clock, Check, AlertTriangle } from 'lucide-react';

export default function ExperimentsPage({ navigateTo }) {
  // Mock data for experiments
  const [experiments, setExperiments] = useState([
    {
      id: 1,
      title: "Experiment 1: Ohm's Law Verification",
      description: "Verify Ohm's Law by measuring voltage and current across a resistor.",
      dueDate: "2024-07-10",
      status: "Pending" // Default status is "Pending"
    },
    {
      id: 2,
      title: "Experiment 2: Series and Parallel Circuits",
      description: "Study the behavior of resistors in series and parallel configurations.",
      dueDate: "2024-07-17",
      status: "Pending"
    },
    {
      id: 3,
      title: "Experiment 3: Capacitor Charging and Discharging",
      description: "Observe the charging and discharging curves of a capacitor.",
      dueDate: "2024-07-24",
      status: "Pending"
    },
    {
      id: 4,
      title: "Experiment 4: Transistor as a Switch",
      description: "Use a transistor to switch a load on and off.",
      dueDate: "2024-07-31",
      status: "Pending"
    },
    {
      id: 5,
      title: "Experiment 5: Diode Characteristics",
      description: "Study the forward and reverse bias characteristics of a diode.",
      dueDate: "2024-08-07",
      status: "Pending"
    },
  ]);

  // Function to update the status of an experiment
  const updateExperimentStatus = (id, newStatus) => {
    setExperiments((prevExperiments) =>
      prevExperiments.map((exp) =>
        exp.id === id ? { ...exp, status: newStatus } : exp
      )
    );
  };

  // Filter experiments based on status
  const [statusFilter, setStatusFilter] = useState('all');
  const filteredExperiments = statusFilter === 'all' 
    ? experiments 
    : experiments.filter(exp => exp.status.toLowerCase() === statusFilter.toLowerCase());

  // Get status color and icon
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'done':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'overdue':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'done':
        return <Check size={16} />;
      case 'pending':
        return <Clock size={16} />;
      case 'overdue':
        return <AlertTriangle size={16} />;
      default:
        return null;
    }
  };

  // Format date to display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return dateString.split('-').join('-');
  };

  return (
    <div className="text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Electronic Devices Lab 2023-24</h1>
        <p className="text-gray-400">Professor-in-charge: Dr. Prashant Kasambe | Prof. Sneha Weaky</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Experiment Manual</h2>
        
        {/* Filters */}
        <div className="mb-4 flex gap-2">
          <button 
            className={`px-4 py-1 rounded-md ${statusFilter === 'all' ? 'bg-blue-600' : 'bg-[#1e293b] hover:bg-[#334155]'}`}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-1 rounded-md ${statusFilter === 'done' ? 'bg-blue-600' : 'bg-[#1e293b] hover:bg-[#334155]'}`}
            onClick={() => setStatusFilter('done')}
          >
            Completed
          </button>
          <button 
            className={`px-4 py-1 rounded-md ${statusFilter === 'pending' ? 'bg-blue-600' : 'bg-[#1e293b] hover:bg-[#334155]'}`}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </button>
        </div>

        {/* Experiments List */}
        <div className="space-y-4">
          {filteredExperiments.map((experiment) => (
            <div 
              key={experiment.id} 
              className="bg-[#1e293b] border border-[#334155] rounded-md p-4 hover:border-blue-500/50 transition-colors cursor-pointer"
              onClick={() => navigateTo('ExperimentDetail', experiment.id, updateExperimentStatus)}
            >
              <h3 className="text-lg font-semibold">{experiment.title}</h3>
              <p className="text-gray-300 mb-3">{experiment.description}</p>
              
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">Due Date:</span>
                  <span>{formatDate(experiment.dueDate)}</span>
                </div>
                
                <div className={`flex items-center gap-1 ${getStatusColor(experiment.status)}`}>
                  {getStatusIcon(experiment.status)}
                  <span>Status: {experiment.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}