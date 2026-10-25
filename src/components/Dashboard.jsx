import React, { useState } from 'react';
import { Sun, Focus, Sparkles, Loader2 } from 'lucide-react';
import CropSelector from './CropSelector.jsx';
import LeafUploader from './LeafUploader.jsx';
import PredictionResult from './PredictionResult.jsx';
import { validateLeafSubmission } from '../utils/validation.js';
import { predictLeaf } from '../services/predictionService.js';

export default function Dashboard({ session }) {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);

  const handleFileSelect = (file) => {
    const { errors } = validateLeafSubmission({ file, selectedCrop });
    if (errors.image) { setValidationErrors({ image: errors.image }); return; }
    setValidationErrors({});
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setValidationErrors({});
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateLeafSubmission({ file: selectedFile, selectedCrop });
    if (!isValid) { setValidationErrors(errors); return; }
    setIsAnalyzing(true);
    try {
      const res = await predictLeaf(selectedFile, selectedCrop);
      setCurrentResult(res);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-authCard border border-black/5 p-5 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">Check Your Crop Leaf</h1>
            <p className="text-xs sm:text-sm text-gray-600 mb-5">Upload or capture a leaf photo to detect disease and receive guidance.</p>
            <form onSubmit={handleAnalyze} className="space-y-5" noValidate>
              <CropSelector selectedCrop={selectedCrop} onSelectCrop={setSelectedCrop} disabled={isAnalyzing} />
              <LeafUploader selectedFile={selectedFile} previewUrl={previewUrl} onFileSelect={handleFileSelect} onClearFile={handleClearFile} error={validationErrors.image} disabled={isAnalyzing} />
              <button type="submit" disabled={isAnalyzing} className="w-full h-11 bg-loginGreen hover:bg-loginGreenHover text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2">
                {isAnalyzing ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Analyzing...</span></> : <><Sparkles className="w-4 h-4" /><span>Analyze Leaf</span></>}
              </button>
            </form>
          </div>
          <PredictionResult result={currentResult} onAnalyzeAnother={() => { handleClearFile(); setCurrentResult(null); }} />
        </div>
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-authCard border border-black/5 p-5 sm:p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-3">How to Take a Clear Leaf Photo</h2>
            <ul className="space-y-3.5 text-xs sm:text-sm text-gray-800">
              <li className="flex items-start gap-2.5"><Sun className="w-4 h-4 text-leafDark shrink-0 mt-0.5" /><span><strong>Use natural daylight:</strong> Avoid strong shadows or glare.</span></li>
              <li className="flex items-start gap-2.5"><Focus className="w-4 h-4 text-leafDark shrink-0 mt-0.5" /><span><strong>Keep the leaf in focus:</strong> Center a single leaf clearly.</span></li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}