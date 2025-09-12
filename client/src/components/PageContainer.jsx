// components/PageContainer.js
export default function PageContainer({ children }) {
  return (
    <div
      className="flex-grow h-screen overflow-y-auto p-6"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {children}
    </div>
  );
}
