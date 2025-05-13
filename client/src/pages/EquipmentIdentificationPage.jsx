import { useState } from 'react';
import { Search, Camera, Image } from 'lucide-react';
import CameraViewer from "../components/CameraViewer";




export default function EquipmentIdentificationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [scanMode, setScanMode] = useState(false);
  const [identifyMode, setIdentifyMode] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [apiOutputImage, setApiOutputImage] = useState(null);

  const handleQrScan = () => {
    setScanMode(true);
    setIdentifyMode(false);
  };

  const handleIdentifyComponents = () => {
    setIdentifyMode(true);
    setScanMode(false);
  };

  const handleStopCamera = () => {
    setScanMode(false);
    setIdentifyMode(false);
  };

const handleCaptureImage = async (imageData) => {
  setCapturedImage(imageData);
  setIdentifyMode(false);

  try {
    // Convert base64 image to a Blob
    const blob = await fetch(imageData).then((res) => res.blob());

    // Create a FormData object
    const formData = new FormData();
    formData.append("file", blob, "captured_image.jpg");

    // Send the image to the backend
    const response = await fetch("http://127.0.0.1:8000/process-image/", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      const processedImageHex = data.processed_image;

      // Convert hex to base64
      const processedImageBase64 = `data:image/jpeg;base64,${btoa(
        processedImageHex.match(/\w{2}/g).map((byte) => String.fromCharCode(parseInt(byte, 16))).join("")
      )}`;

      setApiOutputImage(processedImageBase64);
    } else {
      console.error("Failed to process image");
    }
  } catch (err) {
    console.error("Error processing image:", err);
  }
};

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">Equipment Identification</h1>

      <div className="mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-grow max-w-xl">
            <input
              type="text"
              placeholder="Search equipment by ID, name, type, or location"
              className="w-full pl-10 pr-4 py-2 rounded bg-[#1e293b] border border-[#334155] focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={scanMode || identifyMode}
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <span className="text-gray-400">OR</span>

          <button
            className={`py-2 px-4 rounded flex items-center gap-2 transition-colors ${
              scanMode ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={handleQrScan}
          >
            <Camera size={18} />
            <span>{scanMode ? 'Cancel Scan' : 'Scan QR Code'}</span>
          </button>

          <button
            className={`py-2 px-4 rounded flex items-center gap-2 transition-colors ${
              identifyMode ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
            onClick={handleIdentifyComponents}
          >
            <Image size={18} />
            <span>{identifyMode ? 'Cancel Identify' : 'Identify Components'}</span>
          </button>
        </div>

        {/* Camera Viewer */}
        {scanMode && (
          <CameraViewer mode="scan" onStop={handleStopCamera} />
        )}
        {identifyMode && (
          <CameraViewer mode="identify" onCapture={handleCaptureImage} onStop={handleStopCamera} />
        )}

        {/* Captured / Processed Images */}
        {capturedImage && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Captured Image</h3>
            <img src={capturedImage} alt="Captured" className="w-64 h-64 object-cover rounded" />
            {apiOutputImage && (
              <>
                <h3 className="text-lg font-semibold mt-4 mb-2">Processed Image</h3>
                <img src={apiOutputImage} alt="Processed" className="w-64 h-64 object-cover rounded" />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
