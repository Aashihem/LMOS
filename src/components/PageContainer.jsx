// components/PageContainer.js
export default function PageContainer({ children }) {
  return (
    <div className="flex-grow p-6 overflow-auto bg-[#0f172a] text-white">
      {children}
    </div>
  );
}