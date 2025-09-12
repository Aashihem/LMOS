import React, { useState } from 'react';
import { AlertCircle, Send } from 'lucide-react';

export default function IssueReportingPage() {
  // State for the form inputs
  const [title, setTitle] = useState('');
  const [equipment, setEquipment] = useState('');
  const [lab, setLab] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null); // To show success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const username = localStorage.getItem('username');
    if (!username) {
        setMessage({ type: 'error', text: 'You must be logged in to report an issue.' });
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          equipment,
          lab,
          reported_by_username: username,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Issue reported successfully! The lab faculty has been notified.' });
        // Clear the form
        setTitle('');
        setEquipment('');
        setLab('');
        setDescription('');
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.detail || 'Failed to report issue. Please try again.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'A network error occurred. Please check your connection.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-white p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Report an Issue</h1>
        <p className="text-slate-400 text-sm mt-1">Encountered a problem with a piece of equipment? Let us know by filling out the form below.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700 p-6 rounded-lg space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">Issue Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Oscilloscope screen is flickering"
            required
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="equipment" className="block text-sm font-medium text-slate-300 mb-2">Equipment Name</label>
          <input
            id="equipment"
            type="text"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            placeholder="e.g., Tektronix TDS 2024C"
            required
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="lab" className="block text-sm font-medium text-slate-300 mb-2">Laboratory</label>
          <select
            id="lab"
            value={lab}
            onChange={(e) => setLab(e.target.value)}
            required
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          >
            <option value="" disabled>Select a lab</option>
            <option value="Electronics Lab 1">Electronics Lab 1</option>
            <option value="Communications Lab">Communications Lab</option>
            <option value="Digital Systems Lab">Digital Systems Lab</option>
            <option value="Microwave Lab">Microwave Lab</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">Detailed Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            placeholder="Please provide as much detail as possible, including equipment ID if known and steps to reproduce the issue."
            required
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          ></textarea>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm flex items-center ${message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
            <AlertCircle size={18} className="mr-2" /> {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Submitting...' : <><Send size={16} className="mr-2" /> Report Issue</>}
        </button>
      </form>
    </div>
  );
}

