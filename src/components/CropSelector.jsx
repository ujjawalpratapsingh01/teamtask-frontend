import React from 'react';
import { Sprout } from 'lucide-react';

const CROPS = ['Tomato', 'Potato', 'Rice', 'Wheat', 'Maize (Corn)', 'Cotton', 'Apple', 'Grape'];

export default function CropSelector({ selectedCrop, onSelectCrop, disabled = false }) {
  return (
    <div className="w-full">
      <label className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-900 mb-1.5">
        <Sprout className="w-4 h-4 text-leafDark" /><span>Select Crop Type (Optional)</span>
      </label>
      <select value={selectedCrop} onChange={(e) => onSelectCrop(e.target.value)} disabled={disabled} className="w-full h-11 px-3.5 rounded-lg text-sm bg-inputBg/70 border border-gray-300">
        <option value="">-- Auto-detect / Choose Crop --</option>
        {CROPS.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}