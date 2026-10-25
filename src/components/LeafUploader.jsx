import React, { useRef } from 'react';
import { Upload, Camera, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export default function LeafUploader({ selectedFile, previewUrl, onFileSelect, onClearFile, error = '', disabled = false }) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    e.target.value = '';
  };

  return (
    <div className="w-full">
      <span className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5">Leaf Photograph *</span>
      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleInputChange} className="hidden" />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleInputChange} className="hidden" />
      {!previewUrl ? (
        <div className="border-2 border-dashed border-leafDark/40 rounded-xl p-6 text-center bg-cream/60">
          <div className="w-12 h-12 rounded-full bg-leafLight/30 text-loginGreen flex items-center justify-center mx-auto mb-3">
            <ImageIcon className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">Upload a clear photo of the affected crop leaf</p>
          <p className="text-xs text-gray-600 mb-4">Supported formats: JPEG, PNG, WebP (Max 10 MB)</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" disabled={disabled} onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-loginGreen text-white text-xs sm:text-sm font-medium">
              <Upload className="w-4 h-4" /><span>Choose from Device</span>
            </button>
            <button type="button" disabled={disabled} onClick={() => cameraInputRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-registerGreen text-white text-xs sm:text-sm font-medium">
              <Camera className="w-4 h-4" /><span>Capture with Camera</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl p-4 bg-cream/40">
          <div className="relative w-full max-h-72 overflow-hidden rounded-lg bg-black/5 flex items-center justify-center mb-3">
            <img src={previewUrl} alt="Preview" className="max-h-64 w-auto object-contain rounded-lg" />
            <button type="button" onClick={onClearFile} className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-700">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-leafDark" /><span className="font-medium">{selectedFile?.name}</span>
            </div>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-loginGreen font-medium hover:underline">Replace Image</button>
          </div>
        </div>
      )}
      {error && <p className="text-xs font-medium text-red-700 mt-1.5">{error}</p>}
    </div>
  );
}