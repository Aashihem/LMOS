export default function ExperimentMarks({ experiments }) {
  // Calculate average marks
  const totalMarks = experiments.reduce((sum, exp) => sum + exp.marks, 0);
  const averageMarks = (totalMarks / experiments.length).toFixed(1);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Marks for Experiments</h2>
        <div className="text-sm font-semibold bg-[#2d3748] px-4 py-2 rounded">
          Average: <span className="text-[#60a5fa]">{averageMarks}</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#1e293b] text-left">
              <th className="px-4 py-3 text-white font-semibold border-b border-[#334155]">Experiment</th>
              <th className="px-4 py-3 text-white font-semibold border-b border-[#334155]">Marks</th>
            </tr>
          </thead>
          <tbody>
            {experiments.map((experiment) => (
              <tr key={experiment.id} className="border-b border-[#334155] hover:bg-[#1e293b]">
                <td className="px-4 py-3">{experiment.name}</td>
                <td className="px-4 py-3">{experiment.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}