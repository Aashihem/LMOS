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
      fileType: 'PDF',
      link: 'https://download.tek.com/manual/071273300web_0.pdf',
    },
    {
      id: 'MAN-1002',
      name: 'Spectrum Analyzer Model SA1',
      manufacturer: 'Keysight',
      category: 'Analyzers',
      lastUpdated: '2024-10-15',
      fileSize: '4.8 MB',
      fileType: 'PDF',
      link: 'https://w140.com/tekwiki/images/d/df/070-6022-02.pdf',
    },
    {
      id: 'MAN-1003',
      name: 'Power Supply Model PS1',
      manufacturer: 'ITECH',
      category: 'Power Supplies',
      lastUpdated: '2024-09-22',
      fileSize: '2.1 MB',
      fileType: 'PDF',
      link: 'https://www.rapidonline.com/pdf/554305_v1.pdf',
    },
    {
      id: 'MAN-1004',
      name: 'DMM Model M123',
      manufacturer: 'Fluke',
      category: 'Multimeters',
      lastUpdated: '2024-11-05',
      fileSize: '1.7 MB',
      fileType: 'PDF',
    },
    {
      id: 'MAN-1005',
      name: 'Function Generator Model FG1',
      manufacturer: 'Rigol',
      category: 'Generators',
      lastUpdated: '2024-10-30',
      fileSize: '2.9 MB',
      fileType: 'PDF',
    },
  ];

  // Categories for filter dropdown
  const categories = ['Oscilloscopes', 'Analyzers', 'Power Supplies', 'Multimeters', 'Generators'];

  // Filter manuals based on search query and category
  const filteredManuals = manuals.filter((manual) => {
    const matchesSearch =
      manual.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manual.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      manual.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || manual.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          opacity: 1,
          transform: 'translateY(0)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            position: 'relative',
          }}
        >
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: '800',
              lineHeight: '1.2',
              maxWidth: '70%',
              color: 'white',
              background: 'linear-gradient(to right, #e2e8f0, #f8fafc)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              textShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
            }}
          >
            Equipment Manuals
          </h1>
        </div>

        {/* Decorative top bar */}
        <div
          style={{
            height: '4px',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            borderRadius: '4px',
            marginBottom: '2rem',
          }}
        />

        {/* Search and Filter Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            gap: '1rem',
          }}
        >
          {/* Search */}
          <div
            style={{
              position: 'relative',
              flexGrow: 1,
              maxWidth: '400px',
            }}
          >
            <input
              type="text"
              placeholder="Search manuals by name, manufacturer, or ID"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                paddingLeft: '2.5rem',
                borderRadius: '0.75rem',
                backgroundColor: '#1e293b',
                color: 'white',
                border: '1px solid #334155',
                outline: 'none',
                fontSize: '0.95rem',
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b',
              }}
            />
          </div>

          {/* Category Filter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span
              style={{
                fontSize: '0.875rem',
                color: '#94a3b8',
              }}
            >
              Filter by category:
            </span>
            <select
              style={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '0.75rem',
                padding: '0.5rem',
                color: 'white',
                outline: 'none',
                fontSize: '0.95rem',
              }}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Manuals Table */}
        <div
          style={{
            backgroundColor: '#1e293b',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: '#334155',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                  }}
                >
                  <th style={{ padding: '0.75rem', color: '#94a3b8' }}>ID</th>
                  <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Name</th>
                  <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Manufacturer</th>
                  <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Category</th>
                  <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Last Updated</th>
                  <th style={{ padding: '0.75rem', color: '#94a3b8' }}>File</th>
                  <th style={{ padding: '0.75rem', color: '#94a3b8' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredManuals.map((manual) => (
                  <tr
                    key={manual.id}
                    style={{
                      borderTop: '1px solid #334155',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2d3748')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{manual.id}</td>
                    <td style={{ padding: '0.75rem', color: 'white' }}>{manual.name}</td>
                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{manual.manufacturer}</td>
                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{manual.category}</td>
                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{manual.lastUpdated}</td>
                    <td style={{ padding: '0.75rem', color: '#94a3b8' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={16} style={{ color: '#64748b' }} />
                        <span>{manual.fileType} • {manual.fileSize}</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button
                          style={{
                            color: '#60a5fa',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          title="Download"
                        >
                          <Download size={18} />
                        </button>
                        <button
                          style={{
                            color: '#60a5fa',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                          title="View Online"
                        >
                            <ExternalLink
              size={18}
              style={{ cursor: 'pointer', color: '#60a5fa' }}
              onClick={() => window.open(manual.link, '_blank')}
            />
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
          <div
            style={{
              textAlign: 'center',
              padding: '2rem',
              backgroundColor: '#1e293b',
              borderRadius: '0.75rem',
              marginTop: '1rem',
            }}
          >
            <p style={{ color: '#94a3b8' }}>No manuals found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}