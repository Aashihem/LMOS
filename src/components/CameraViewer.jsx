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
    <div className="mt-4 bg-[#1e293b] border border-dashed border-[#334155] rounded p-8 flex flex-col items-center justify-center">
      <video ref={videoRef} autoPlay playsInline className="w-64 h-64 bg-black rounded" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {mode === 'identify' && (
        <button
          onClick={handleCapture}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Capture Image
        </button>
      )}
      <button
        onClick={onStop}
        className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
      >
        Stop Camera
      </button>
    </div>
  );
}
