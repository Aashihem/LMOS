import { ArrowLeft, Check, Clock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function ExperimentDetail({ experimentId, navigateTo }) {
  // Initial experiment data with "Pending" status
  const initialExperiments = [
    {
      id: 1,
      title: "Experiment 1: Ohm's Law Verification",
      description: "Verify Ohm's Law by measuring voltage and current across a resistor.",
      dueDate: "2024-07-10",
      status: "Pending",
      instructions: `
        **Objective**: To verify Ohm's Law (V = IR) in a simple resistive circuit.
        **Materials**:
        - Resistor (1 kΩ)
        - Power supply
        - Multimeter
        - Connecting wires
        **Procedure**:
        1. Connect the resistor to the power supply.
        2. Set the power supply to different voltages (e.g., 5V, 10V, 15V).
        3. Measure the current through the resistor using the multimeter.
        4. Record voltage and current values.
        5. Calculate resistance using Ohm's Law and compare with the nominal value.
        **Expected Results**:
        - The ratio of voltage to current should be constant, confirming Ohm's Law.
      `,
    },
    {
      id: 2,
      title: "Experiment 2: Series and Parallel Circuits",
      description: "Study the behavior of resistors in series and parallel configurations.",
      dueDate: "2024-07-17",
      status: "Pending",
      instructions: `
        **Objective**: To understand the behavior of resistors in series and parallel circuits.
        **Materials**:
        - Resistors (2 kΩ, 3 kΩ)
        - Power supply
        - Multimeter
        - Breadboard
        **Procedure**:
        1. Connect two resistors in series and measure total resistance.
        2. Connect the same resistors in parallel and measure total resistance.
        3. Apply a voltage (e.g., 10V) and measure current in both configurations.
        4. Verify calculations with theoretical values.
        **Expected Results**:
        - Series: Total resistance = R1 + R2
        - Parallel: Total resistance = (R1 * R2) / (R1 + R2)
      `,
    },
    {
      id: 3,
      title: "Experiment 3: Capacitor Charging and Discharging",
      description: "Observe the charging and discharging curves of a capacitor.",
      dueDate: "2024-07-24",
      status: "Pending",
      instructions: `
        **Objective**: To study the charging and discharging characteristics of a capacitor.
        **Materials**:
        - Capacitor (100 µF)
        - Resistor (10 kΩ)
        - Power supply
        - Oscilloscope
        **Procedure**:
        1. Connect the capacitor and resistor in series with the power supply.
        2. Apply a square wave input to charge and discharge the capacitor.
        3. Use the oscilloscope to observe the voltage across the capacitor.
        4. Record the time constant (τ = RC).
        **Expected Results**:
        - Exponential charging and discharging curves with time constant τ.
      `,
    },
    {
      id: 4,
      title: "Experiment 4: Transistor as a Switch",
      description: "Use a transistor to switch a load on and off.",
      dueDate: "2024-07-31",
      status: "Pending",
      instructions: `
        **Objective**: To demonstrate the use of a transistor as a switch.
        **Materials**:
        - NPN Transistor (e.g., 2N3904)
        - Resistor (1 kΩ)
        - LED
        - Power supply
        **Procedure**:
        1. Connect the transistor to control an LED load.
        2. Apply a base current to turn the transistor on/off.
        3. Observe the LED switching behavior.
        4. Measure collector-emitter voltage in on/off states.
        **Expected Results**:
        - Transistor switches the LED on when base current is applied.
      `,
    },
    {
      id: 5,
      title: "Experiment 5: Diode Characteristics",
      description: "Study the forward and reverse bias characteristics of a diode.",
      dueDate: "2024-08-07",
      status: "Pending",
      instructions: `
        **Objective**: To study the I-V characteristics of a diode.
        **Materials**:
        - Diode (e.g., 1N4148)
        - Resistor (1 kΩ)
        - Power supply
        - Multimeter
        **Procedure**:
        1. Connect the diode in forward bias and measure current for different voltages.
        2. Connect the diode in reverse bias and measure leakage current.
        3. Plot the I-V curve.
        **Expected Results**:
        - Forward bias: Exponential current increase after threshold voltage.
        - Reverse bias: Negligible current until breakdown voltage.
      `,
    },
  ];

  // Use state to manage experiment data and allow status updates
  const [experiments, setExperiments] = useState(initialExperiments);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Find the experiment by ID
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
    // Update the experiment's status to "Done"
    const updatedExperiments = experiments.map((exp) =>
      exp.id === experimentId ? { ...exp, status: "Done" } : exp
    );
    setExperiments(updatedExperiments);

    // Show submission confirmation
    if (uploadedFile) {
      alert(`Submitted data for ${experiment.title} with file: ${uploadedFile.name}`);
    } else {
      alert(`Submitted data for ${experiment.title} without a file`);
    }

    // Navigate back to Experiments page
    navigateTo('Experiments');
  };

  return (
    <div className="text-white">
      {!experiment || !experiment.id ? (
        <div>Experiment not found</div>
      ) : (
        <>
          <div className="mb-6">
            <button
              onClick={() => navigateTo('Experiments')}
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Experiments
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">{experiment.title}</h1>
            <p className="text-gray-300 mb-4">{experiment.description}</p>

            <div className="bg-[#1e293b] border border-[#334155] rounded-md p-6">
              <h2 className="text-xl font-semibold mb-3">Instructions</h2>
              <pre className="text-gray-300 whitespace-pre-wrap">{experiment.instructions}</pre>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Upload Experiment File</h3>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                {uploadedFile && (
                  <p className="mt-2 text-gray-400">Uploaded: {uploadedFile.name}</p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap justify-between items-center">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">Due Date:</span>
                  <span>{formatDate(experiment.dueDate)}</span>
                </div>
                <div className={`flex items-center gap-1 ${getStatusColor(experiment.status)}`}>
                  {getStatusIcon(experiment.status)}
                  <span>Status: {experiment.status}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="mt-6 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                disabled={experiment.status === "Done"} // Disable button if already submitted
              >
                Submit Experiment
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}