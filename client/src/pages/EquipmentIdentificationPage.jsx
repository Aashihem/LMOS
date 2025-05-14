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
      const blob = await fetch(imageData).then((res) => res.blob());
      const formData = new FormData();
      formData.append("file", blob, "captured_image.jpg");

      const response = await fetch("http://127.0.0.1:8000/process-image/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const processedImageHex = data.processed_image;

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
            Equipment Identification
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

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                flexGrow: 1,
                maxWidth: '400px',
              }}
            >
              <input
                type="text"
                placeholder="Search equipment by ID, name, type, or location"
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
                disabled={scanMode || identifyMode}
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

            <button
              style={{
                padding: '0.875rem 1.5rem',
                borderRadius: '0.75rem',
                backgroundColor: scanMode ? '#dc2626' : '#2563eb',
                color: 'white',
                fontWeight: '600',
                fontSize: '0.95rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onClick={handleQrScan}
            >
              <Camera size={18} style={{ marginRight: '0.5rem' }} />
              {scanMode ? 'Cancel Scan' : 'Scan QR Code'}
            </button>

            <button
              style={{
                padding: '0.875rem 1.5rem',
                borderRadius: '0.75rem',
                backgroundColor: identifyMode ? '#dc2626' : '#16a34a',
                color: 'white',
                fontWeight: '600',
                fontSize: '0.95rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onClick={handleIdentifyComponents}
            >
              <Image size={18} style={{ marginRight: '0.5rem' }} />
              {identifyMode ? 'Cancel Identify' : 'Identify Components'}
            </button>
          </div>

          {/* Camera Viewer */}
          {scanMode && <CameraViewer mode="scan" onStop={handleStopCamera} />}
          {identifyMode && (
            <CameraViewer
              mode="identify"
              onCapture={handleCaptureImage}
              onStop={handleStopCamera}
            />
          )}

          {/* Captured / Processed Images */}
          {capturedImage && (
            <div>
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  color: 'white',
                }}
              >
                Captured Image
              </h3>
              <img
                src={capturedImage}
                alt="Captured"
                style={{
                  width: '256px',
                  height: '256px',
                  objectFit: 'cover',
                  borderRadius: '0.75rem',
                }}
              />
              {apiOutputImage && (
                <>
                  <h3
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: '700',
                      marginTop: '1rem',
                      marginBottom: '0.75rem',
                      color: 'white',
                    }}
                  >
                    Processed Image
                  </h3>
                  <img
                    src={apiOutputImage}
                    alt="Processed"
                    style={{
                      width: '256px',
                      height: '256px',
                      objectFit: 'cover',
                      borderRadius: '0.75rem',
                    }}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
