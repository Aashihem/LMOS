import React, { useEffect, useRef } from 'react';
import jsQR from 'jsqr';

export default function CameraViewer({ mode = 'scan', onCapture, onStop }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scanIntervalRef = useRef(null);

  useEffect(() => {
    let stream = null;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        if (mode === 'scan') {
          startQrScanning();
        }
      } catch (error) {
        console.error('Camera access error:', error);
        alert('Unable to access the camera.');
        if (onStop) onStop();
      }
    }

    function startQrScanning() {
      scanIntervalRef.current = setInterval(() => {
        if (!videoRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          clearInterval(scanIntervalRef.current);
          alert(`QR Code detected: ${code.data}`);
          window.open(code.data, '_blank'); // Open the QR code URL in a new tab
          if (onStop) onStop();
        }
      }, 500); // Scan every 500ms
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, [mode]);

  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    if (onCapture) onCapture(dataUrl);
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
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#1e293b',
          borderRadius: '0.75rem',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'white',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}
        >
          Camera Viewer
        </h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
              backgroundColor: 'black',
              borderRadius: '0.75rem',
            }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          {mode === 'identify' && (
            <button
              onClick={handleCapture}
              style={{
                padding: '0.875rem 1.5rem',
                borderRadius: '0.75rem',
                backgroundColor: '#2563eb',
                color: 'white',
                fontWeight: '600',
                fontSize: '0.95rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              Capture Image
            </button>
          )}
          <button
            onClick={onStop}
            style={{
              padding: '0.875rem 1.5rem',
              borderRadius: '0.75rem',
              backgroundColor: '#ef4444',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            Stop Camera
          </button>
        </div>
      </div>
    </div>
  );
}
