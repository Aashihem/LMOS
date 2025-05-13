import { useState } from 'react';
import { Search, FileText, Download, ExternalLink } from 'lucide-react';

export default function EquipmentManualsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock data for equipment manuals
  const manuals = [
    {
      id: 'MAN-1001',
      name: 'Digital Oscilloscope Model DS1',
      manufacturer: 'Tektronix',
      category: 'Oscilloscopes',
      lastUpdated: '2024-11-10',
      fileSize: '3.2 MB',
      fileType: 'PDF'
    },
    {
      id: 'MAN-1002',
      name: 'Spectrum Analyzer Model SA1',
      manufacturer: 'Keysight',
      category: 'Analyzers',
      lastUpdated: '2024-10-15',
      fileSize: '4.8 MB',
      fileType: 'PDF'
    },
    {
      id: 'MAN-1003',
      name: 'Power Supply Model PS1',
      manufacturer: 'ITECH',
      category: 'Power Supplies',
      lastUpdated: '2024-09-22',
      fileSize: '2.1 MB',
      fileType: 'PDF'
    },
    {
      id: 'MAN-1004',
      name: 'DMM Model M123',
      manufacturer: 'Fluke',
      category: 'Multimeters',
      lastUpdated: '2024-11-05',
      fileSize: '1.7 MB',
      fileType: 'PDF'
    },
    {
      id: 'MAN-1005',
      name: 'Function Generator Model FG1',
      manufacturer: 'Rigol',
      category: 'Generators',
      lastUpdated: '2024-10-30',
      fileSize: '2.9 MB',
      fileType: 'PDF'
    }
  ];

  // Categories for filter dropdown
  const categories = ['Oscilloscopes', 'Analyzers', 'Power Supplies', 'Multimeters', 'Generators'];

  // Filter manuals based on search query and category
  const filteredManuals = manuals.filter(manual => {
    const matchesSearch = manual.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         manual.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         manual.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || manual.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">Equipment Manuals</h1>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search manuals by name, manufacturer, or ID"
            className="w-full pl-10 pr-4 py-2 rounded bg-[#1e293b] border border-[#334155] focus:outline-none focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Filter by category:</span>
          <select 
            className="bg-[#1e293b] border border-[#334155] rounded p-2 focus:outline-none focus:border-blue-500"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Manuals Table */}
      <div className="bg-[#1e293b] rounded-md overflow-hidden shadow">
        <div className="overflow-x-auto"> {/* Added horizontal scroll */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#334155] text-left text-sm uppercase font-semibold">
                <th className="px-4 py-3 text-gray-300">ID</th>
                <th className="px-4 py-3 text-gray-300">Name</th>
                <th className="px-4 py-3 text-gray-300">Manufacturer</th>
                <th className="px-4 py-3 text-gray-300">Category</th>
                <th className="px-4 py-3 text-gray-300">Last Updated</th>
                <th className="px-4 py-3 text-gray-300">File</th>
                <th className="px-4 py-3 text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredManuals.map((manual) => (
                <tr key={manual.id} className="border-t border-[#334155] hover:bg-[#2d3748]">
                  <td className="px-4 py-3 text-gray-300">{manual.id}</td>
                  <td className="px-4 py-3">{manual.name}</td>
                  <td className="px-4 py-3 text-gray-300">{manual.manufacturer}</td>
                  <td className="px-4 py-3 text-gray-300">{manual.category}</td>
                  <td className="px-4 py-3 text-gray-300">{manual.lastUpdated}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-gray-400" />
                      <span className="text-gray-300">{manual.fileType} • {manual.fileSize}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-400 hover:text-blue-500 p-1 rounded" title="Download">
                        <Download size={18} />
                      </button>
                      <button className="text-blue-400 hover:text-blue-500 p-1 rounded" title="View Online">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* No Results */}
      {filteredManuals.length === 0 && (
        <div className="text-center py-10 bg-[#1e293b] rounded-md mt-4">
          <p className="text-gray-400">No manuals found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}