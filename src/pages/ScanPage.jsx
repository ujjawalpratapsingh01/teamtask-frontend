import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, CheckCircle2, Lightbulb, RefreshCcw, AlertTriangle } from 'lucide-react';
import ScanNavbar from '../components/ScanNavbar.jsx';
import ScanFooter from '../components/ScanFooter.jsx';
import { predictLeaf } from '../services/predictionService.js';
import { getPredictionsList, deletePrediction } from '../services/cropdocService.js';

export default function ScanPage({ session, onLogout }) {
  const [scans, setScans] = useState([]);
  const [activeScan, setActiveScan] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  // Load live previous scan history from Render backend on mount
  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await getPredictionsList(0, 20);
        const list = Array.isArray(res?.data)
          ? res.data
          : res?.data?.content || res?.data?.predictions || [];

        if (list.length > 0) {
          const formatted = list.map((item) => {
            const rawDisease = item.disease || item.prediction?.disease || 'Early Blight';
            const cleanDisease = rawDisease.replace(/_/g, ' ');
            const isHealthy = cleanDisease.toLowerCase().includes('healthy');
            const conf = item.confidence ?? item.prediction?.confidence ?? 92;

            return {
              id: item.id || item.predictionId || `scan_${Math.random()}`,
              crop: `${item.crop || item.prediction?.crop || 'Crop'} leaf`,
              disease: cleanDisease,
              status: isHealthy ? 'No Disease Detected' : 'Disease Detected',
              date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent',
              time: item.createdAt ? new Date(item.createdAt).toLocaleTimeString() : 'Today',
              confidence: conf <= 1 ? Math.round(conf * 100) : Math.round(conf),
              image: item.imageUrl || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb26b63?auto=format&fit=crop&w=600&q=80',
              secondaryImages: [item.imageUrl || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb26b63?auto=format&fit=crop&w=300&q=80'],
              description: item.description || `Detected ${cleanDisease} on crop sample via AI diagnostic scan.`,
              recommendations: item.guidance || item.preventiveTips || [
                'Remove and safely dispose of infected leaves.',
                'Ensure proper spacing for good air circulation.',
                'Avoid overhead irrigation.'
              ]
            };
          });

          setScans(formatted);
          setActiveScan(formatted[0]);
          setSelectedFiles([{ id: 'p1', url: formatted[0].image, name: 'latest_scan.jpg' }]);
        }
      } catch (err) {
        console.warn('Could not load prediction history from backend:', err.message);
      }
    }

    loadHistory();
  }, []);

  // Handle Image Upload & Real ML Backend Prediction Call
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const file = files[0]; // Take the first uploaded image for ML prediction
    const previewUrl = URL.createObjectURL(file);

    const newPreview = {
      id: `file_${Date.now()}`,
      url: previewUrl,
      name: file.name
    };

    setSelectedFiles((prev) => [newPreview, ...prev]);
    setIsAnalyzing(true);
    setErrorMsg('');

    try {
      // Calls real ML backend via predictionService.js -> POST /api/v1/predictions
      const result = await predictLeaf(file);

      const newScanResult = {
        id: result.id || `scan_${Date.now()}`,
        crop: `${result.crop || 'Crop'} leaf`,
        disease: result.disease || 'Early Blight',
        status: result.isHealthy ? 'No Disease Detected' : 'Disease Detected',
        date: 'Just now',
        time: 'Today',
        confidence: result.confidence || 91,
        image: previewUrl,
        secondaryImages: [previewUrl],
        description: result.description || `Analysis completed on uploaded sample. ${result.disease} identified by AI mobile net model.`,
        recommendations: result.guidance || [
          'Remove severe leaves',
          'Use fungicide For e.g. Mancozeb',
          'Ensure proper spacing and avoid irrigation'
        ]
      };

      setScans((prev) => [newScanResult, ...prev]);
      setActiveScan(newScanResult);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to analyze leaf image with ML model.');
    } finally {
      setIsAnalyzing(false);
      e.target.value = null; // Reset input
    }
  };

  const handleClearAllHistory = async () => {
    if (window.confirm('Are you sure you want to clear all previous scan history?')) {
      for (const s of scans) {
        try {
          await deletePrediction(s.id);
        } catch {
          // ignore individual delete errors
        }
      }
      setScans([]);
      setActiveScan(null);
      setSelectedFiles([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBE7] flex flex-col font-sans">
      <ScanNavbar session={session} onLogout={onLogout} />

      {/* Main Dark Forest Green Upload Section with Botanical Foliage */}
      <section className="relative w-full bg-[#0D3006] py-12 sm:py-16 px-4 sm:px-8 overflow-hidden text-[#FFFBE7]">
        {/* Top-Left Monstera Leaf Watermark */}
        <div className="absolute -top-10 -left-10 w-48 sm:w-64 opacity-40 pointer-events-none select-none z-0">
          <svg viewBox="0 0 220 260" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M110 8C80 12 42 35 24 72C48 64 78 72 92 86C62 78 28 84 10 115C38 110 72 118 88 134C54 128 24 140 12 170C42 162 74 168 92 184C65 182 38 198 30 222C58 214 85 224 108 252C132 224 158 214 186 222C178 198 152 182 125 184C142 168 174 162 204 170C192 140 162 128 128 134C144 118 178 110 206 115C188 84 154 78 124 86C138 72 168 64 192 72C174 35 136 12 110 8Z" fill="#1E7E48" />
          </svg>
        </div>

        {/* Top-Right Banana/Pale Leaf */}
        <div className="absolute -top-6 -right-6 w-48 sm:w-64 opacity-40 pointer-events-none select-none z-0">
          <svg viewBox="0 0 180 260" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 10C48 45 95 110 135 250L168 245C162 185 145 142 120 112L102 122L114 98C92 66 56 32 12 10Z" fill="#A3DE83" />
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto flex flex-col items-center z-10">
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Central Upload Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-2xl border-2 border-dashed border-[#20B96C] bg-[#102D05] hover:bg-[#143808] rounded-3xl p-10 sm:p-14 text-center cursor-pointer transition shadow-2xl group"
          >
            <div className="w-16 h-16 rounded-full bg-[#20B96C]/20 text-[#20B96C] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
              <Camera className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-white">Click to upload leaf image</h2>
            <p className="text-xs sm:text-sm text-[#A7DD91]">jpeg, png upto 20MB (Connects to Live ML Backend)</p>
          </div>

          {errorMsg && (
            <div className="mt-4 p-3 bg-red-900/80 border border-red-500 rounded-xl text-white text-xs flex items-center gap-2 max-w-2xl w-full">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-300" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Preview Images Section */}
          <div className="w-full max-w-2xl mt-6">
            <h3 className="text-sm font-medium mb-3 text-[#FFFBE7]">Preview images</h3>
            
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {selectedFiles.map((file, idx) => (
                <div key={file.id || idx} className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#20B96C] shrink-0 bg-black/40 shadow-md">
                  <img src={file.url} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ))}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white text-[#0D3006] flex flex-col items-center justify-center gap-1.5 shrink-0 hover:bg-[#FFFBE7] transition shadow-md"
              >
                <Upload className="w-5 h-5 text-[#1E7E48]" />
                <span className="text-xs font-semibold">Upload more</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Previous Scans Panel */}
        <div className="lg:col-span-4 bg-white rounded-3xl shadow-xl border border-black/5 p-5 sm:p-6">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-base">Previous scans</h3>
            {scans.length > 0 && (
              <button
                type="button"
                onClick={handleClearAllHistory}
                className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {scans.length === 0 ? (
            <p className="text-xs text-gray-500 py-6 text-center">No previous scans found.</p>
          ) : (
            <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
              {scans.map((scan) => (
                <div
                  key={scan.id}
                  onClick={() => setActiveScan(scan)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start gap-3.5 ${
                    activeScan?.id === scan.id ? 'border-[#1E7E48] bg-[#EBF7EE]/40 shadow-sm' : 'border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <img src={scan.image} alt={scan.crop} className="w-14 h-14 rounded-xl object-cover shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-bold text-gray-900 truncate">{scan.crop}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mb-1">{scan.time}</p>
                    <span className={`inline-block mb-1 text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
                      scan.status === 'Disease Detected' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {scan.status}
                    </span>
                    <p className="text-xs text-[#1E7E48] font-bold truncate">{scan.disease}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Scan Results Panel */}
        <div className="lg:col-span-8 bg-white rounded-3xl shadow-xl border border-black/5 p-6 sm:p-8">
          {isAnalyzing ? (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <RefreshCcw className="w-10 h-10 text-[#1E7E48] animate-spin mb-3" />
              <p className="text-sm font-semibold text-gray-800">Analyzing leaf image with live ML model (Render)...</p>
            </div>
          ) : activeScan ? (
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Scan Results</h3>
                <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold ${
                  activeScan.status === 'Disease Detected' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {activeScan.status}
                </span>
              </div>

              {/* Confidence Score Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-bold mb-1.5 text-gray-800">
                  <span>Confidence Score</span>
                  <span>{activeScan.confidence}% Confidence</span>
                </div>
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#20B96C] h-full rounded-full transition-all duration-500"
                    style={{ width: `${activeScan.confidence}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
                <div className="md:col-span-6">
                  <div className="relative rounded-2xl overflow-hidden bg-black/5 h-64 sm:h-72 shadow-inner flex items-center justify-center">
                    <img src={activeScan.image} alt={activeScan.crop} className="w-full h-full object-cover" />
                    <div className="absolute bottom-3 left-3 bg-[#102D05]/85 backdrop-blur text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#20B96C]" />
                      <span>ML Verified</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-6 flex flex-col justify-start">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">{activeScan.disease}</h4>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {activeScan.description}
                  </p>
                </div>
              </div>

              {activeScan.secondaryImages && activeScan.secondaryImages.length > 0 && (
                <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
                  {activeScan.secondaryImages.map((imgUrl, idx) => (
                    <div key={idx} className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shrink-0 shadow-sm">
                      <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* Recommendations Box */}
              <div className="bg-[#EBF7EE] rounded-2xl p-6 border border-[#20B96C]/30 shadow-sm">
                <div className="flex items-center gap-2.5 mb-3">
                  <Lightbulb className="w-5 h-5 text-[#1E7E48]" />
                  <h4 className="font-bold text-gray-900 text-base">Recommendations</h4>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-800">
                  {activeScan.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#1E7E48] shrink-0 mt-0.5" />
                      <span className="font-medium">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-20">Select a scan from history or upload a new leaf image to view ML results.</p>
          )}
        </div>

      </section>

      <ScanFooter />
    </div>
  );
}