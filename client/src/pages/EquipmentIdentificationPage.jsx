import { useState, useRef } from 'react';
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

  // --- New: File upload / Gemini UI logic added below (does not change existing camera logic) ---
  const dropZoneRef = useRef(null);
  const imageUploadRef = useRef(null);

  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      showError('Please upload a valid image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const base64 = dataUrl.split(',')[1];
      setImageBase64(base64);
      setResults(null);
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  const resetUI = () => {
    setImageBase64(null);
    if (imageUploadRef.current) imageUploadRef.current.value = '';
    setResults(null);
    setLoading(false);
    setErrorMsg('');
    setShowErrorModal(false);
  };

  async function callGeminiAPI(base64ImageData, retryCount = 0) {
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const systemPrompt = `You are an expert in electrical and electronic lab equipment. Your task is to analyze an image of a device and identify its type and model number.
    Respond ONLY with a valid JSON object.
    The JSON object must have two keys: "deviceType" (e.g., "Digital Storage Oscilloscope", "Digital Multimeter", "DC Power Supply") and "modelNumber".
    If a model number cannot be found, the value for "modelNumber" should be "Not found".`;

    const payload = {
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageData
              }
            }
          ]
        }
      ],
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        if (response.status === 429 && retryCount < 3) {
          const delay = Math.pow(2, retryCount) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          return callGeminiAPI(base64ImageData, retryCount + 1);
        }
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(`API request failed: ${errorBody.error?.message || response.statusText}`);
      }

      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Invalid response from the model.");
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanedText);
    } catch (e) {
      throw new Error(`An error occurred: ${e.message}`);
    }
  }

  const displayResults = (data) => {
    if (!data || !data.deviceType) {
      showError("Identification failed. The model couldn't determine the device type.");
      return;
    }
    setResults({
      deviceType: data.deviceType,
      modelNumber: data.modelNumber || "Not found",
    });
  };

  const showError = (message) => {
    setErrorMsg(message);
    setShowErrorModal(true);
  };

  // --- render ---
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

          {/* ----------------------- NEW: Static Upload UI section converted to React ----------------------- */}
          <div className="container mx-auto p-4 md:p-8 max-w-2xl w-full">
            <div className="bg-gray-800 shadow-2xl rounded-2xl p-6 md:p-8">
              <header className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">Electrical Component Identifier</h2>
                <p className="text-gray-400 mt-2">Upload a photo to identify a device and find its manual.</p>
              </header>

              <main>
                <div id="upload-section">
                  <div
                    id="drop-zone"
                    ref={dropZoneRef}
                    onClick={() => imageUploadRef.current && imageUploadRef.current.click()}
                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('drop-zone-over'); }}
                    onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('drop-zone-over'); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('drop-zone-over');
                      const files = e.dataTransfer.files;
                      if (files.length) handleFile(files[0]);
                    }}
                    className="drop-zone p-6 text-center cursor-pointer bg-gray-700/50 hover:bg-gray-700/80"
                  >
                    <input
                      ref={imageUploadRef}
                      type="file"
                      id="image-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => { if (e.target.files.length) handleFile(e.target.files[0]); }}
                    />
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v5a4 4 0 01-4 4H7z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <p className="text-gray-300">Drag & drop an image here, or <span className="font-semibold text-indigo-400">click to select</span></p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP supported</p>
                    </div>
                  </div>
                </div>

                {/* Image Preview */}
                {imageBase64 && (
                  <div className="mt-6 text-center">
                    <img id="image-preview" src={`data:image/jpeg;base64,${imageBase64}`} alt="Image preview" className="max-h-64 mx-auto rounded-lg shadow-lg" />
                    <button
                      id="identify-btn"
                      className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={async () => {
                        if (!imageBase64) { showError('No image selected.'); return; }
                        setLoading(true);
                        try {
                          const res = await callGeminiAPI(imageBase64);
                          displayResults(res);
                        } catch (err) {
                          showError(err.message || 'Failed to identify component. Please try again.');
                        } finally {
                          setLoading(false);
                        }
                      }}
                      disabled={loading}
                    >
                      {loading ? 'Analyzing...' : 'Identify Component'}
                    </button>
                    <button
                      id="change-image-btn"
                      className="mt-2 w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
                      onClick={resetUI}
                    >
                      Change Image
                    </button>
                  </div>
                )}

                {/* Loader */}
                {loading && (
                  <div className="flex flex-col items-center justify-center mt-8">
                    <div className="loader" style={{ borderTopColor: '#4c51bf' }} />
                    <p className="text-gray-400 mt-3">Analyzing image... this may take a moment.</p>
                  </div>
                )}

                {/* Results */}
                {results && (
                  <div className="mt-8 bg-gray-700/50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-center">Identification Results</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">Device Type</p>
                        <p id="device-type" className="text-lg font-medium text-white">{results.deviceType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Model Number</p>
                        <p id="model-number" className="text-lg font-medium text-white">{results.modelNumber}</p>
                      </div>
                    </div>
                    {results.modelNumber && results.modelNumber.toLowerCase() !== 'not found' && (
                      <a
                        id="manual-link"
                        href={`https://www.google.com/search?q=${encodeURIComponent(`${results.deviceType} ${results.modelNumber} user manual filetype:pdf`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        Find User Manual
                      </a>
                    )}
                  </div>
                )}
              </main>
            </div>
          </div>

          {/* Error Modal */}
          {showErrorModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-red-800 rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
                <h3 className="text-xl font-bold mb-3 text-white">Error</h3>
                <p className="text-red-100 mb-4">{errorMsg}</p>
                <button onClick={() => setShowErrorModal(false)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}