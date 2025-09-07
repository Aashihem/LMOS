// components/PageContainer.js
export default function PageContainer({ children }) {
  return (
    <div
      style={{
        flexGrow: 1,
        padding: '',
        overflow: 'auto',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {children}
    </div>
  );
}