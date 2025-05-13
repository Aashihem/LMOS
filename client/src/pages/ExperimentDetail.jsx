import { ArrowLeft, Check, Clock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function ExperimentDetail({ experimentId, navigateTo, updateExperimentStatus }) {
  const initialExperiments = [
    {
      id: 1,
      title: "Experiment 1: Ohm's Law Verification",
      description: "Verify Ohm's Law by measuring voltage and current across a resistor.",
      dueDate: "2024-07-10",
      status: "Pending",
      instructions: `
        Objective: To verify Ohm's Law (V = IR) in a simple resistive circuit.
        Materials:
        - Resistor (1 kΩ)
        - Power supply
        - Multimeter
        - Connecting wires
        Procedure:
        1. Connect the resistor to the power supply.
        2. Set the power supply to different voltages (e.g., 5V, 10V, 15V).
        3. Measure the current through the resistor using the multimeter.
        4. Record voltage and current values.
        5. Calculate resistance using Ohm's Law and compare with the nominal value.
        Expected Results:
        - The ratio of voltage to current should be constant, confirming Ohm's Law.
      `,
    },
    // ...other experiments...
  ];

  const [experiments, setExperiments] = useState(initialExperiments);
  const [uploadedFile, setUploadedFile] = useState(null);

  const experiment = experiments.find((exp) => exp.id === experimentId) || {};

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return dateString ? dateString.split('-').join('-') : 'N/A';
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
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
    switch (status?.toLowerCase()) {
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

  const handleSubmit = () => {
  if (!uploadedFile) {
    alert("Please upload a file before submitting.");
    return;
  }

  // Simulate file submission (you can replace this with an API call)
  console.log(`Submitting file: ${uploadedFile.name} for experiment: ${experiment.title}`);

  // Update the status of the experiment to "Done"
  updateExperimentStatus(experimentId, "Done");

  alert(`Submitted data for ${experiment.title} with file: ${uploadedFile.name}`);

  // Navigate back to the Experiments page
  navigateTo('Experiments');
};
  return (
    <div className="text-white max-w-4xl mx-auto p-6">
      {!experiment || !experiment.id ? (
        <div className="text-center text-gray-400">Experiment not found</div>
      ) : (
        <>
          <div className="mb-8">
            <button
              onClick={() => navigateTo('Experiments')}
              className="flex items-center text-gray-300 hover:text-white transition-all duration-200 bg-[#1e293b] px-4 py-2 rounded-lg shadow-md hover:shadow-lg"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Experiments
            </button>
          </div>

          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-3 text-white tracking-tight">{experiment.title}</h1>
            <p className="text-gray-300 text-lg leading-relaxed">{experiment.description}</p>
          </div>

          <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white">Instructions</h2>
            <pre className="text-gray-200 text-base leading-relaxed bg-[#0f172a] p-4 rounded-lg whitespace-pre-wrap">{experiment.instructions}</pre>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3 text-white">Upload Experiment File</h3>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white file:font-semibold hover:file:bg-blue-700 file:transition-all file:duration-200 file:cursor-pointer"
                />
                {uploadedFile && (
                  <p className="text-gray-400 text-sm italic">Uploaded: {uploadedFile.name}</p>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-between items-center bg-[#0f172a] p-4 rounded-lg">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-400 font-medium">Due Date:</span>
                <span className="text-gray-200">{formatDate(experiment.dueDate)}</span>
              </div>
              <div className={`flex items-center gap-2 ${getStatusColor(experiment.status)}`}>
                {getStatusIcon(experiment.status)}
                <span className="font-medium">Status: {experiment.status}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className={`mt-8 px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md ${
                experiment.status === "Done"
                  ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
              }`}
              disabled={experiment.status === "Done"}
            >
              Submit Experiment
            </button>
          </div>
        </>
      )}
    </div>
  );
}