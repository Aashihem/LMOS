export default function ProfileStats({ activeTab, setActiveTab, attendance, issues }) {
  const tabs = [
    { id: 'marks', label: 'Marks' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'issues', label: 'Issues' }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            px-6 py-4 rounded transition-colors font-semibold text-center
            ${activeTab === tab.id ? 'bg-[#2563eb] text-white' : 'bg-[#2d3748] text-white hover:bg-[#334155]'}
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}