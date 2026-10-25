import React from 'react';
import { ShieldAlert, RefreshCw, Sprout, Info, HelpCircle } from 'lucide-react';

export default function PredictionResult({ result, onAnalyzeAnother }) {
  if (!result) return null;
  return (
    <section className="bg-white rounded-xl shadow-authCard border border-black/5 p-5 sm:p-6 mt-6">
      {result.isSimulated && (
        <div className="mb-4 px-3.5 py-2.5 rounded-lg bg-amber-50 border border-amber-300 flex items-start gap-2.5 text-xs text-amber-900">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div><strong>Simulated Demo Response:</strong> Connect VITE_API_BASE_URL to your team's backend for live ML predictions.</div>
        </div>
      )}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3.5 mb-4">
        <div className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-leafDark" />
          <h2 className="text-lg font-semibold text-gray-900">Analysis Outcome</h2>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-900 border border-red-300">
          <ShieldAlert className="w-3.5 h-3.5" /><span>{result.uncertaintyStatus}</span>
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-5">
        <div className="p-3.5 rounded-lg bg-cream/70"><span className="text-[11px] uppercase text-gray-500 font-semibold block">Crop</span><span className="text-base font-semibold">{result.crop}</span></div>
        <div className="p-3.5 rounded-lg bg-cream/70"><span className="text-[11px] uppercase text-gray-500 font-semibold block">Condition</span><span className="text-base font-semibold text-loginGreen">{result.disease}</span></div>
        <div className="p-3.5 rounded-lg bg-cream/70"><span className="text-[11px] uppercase text-gray-500 font-semibold block">Confidence</span><span className="text-base font-semibold">{result.confidence}%</span></div>
      </div>
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Preventive & Care Guidance</h3>
        <ul className="space-y-2 bg-cream/40 p-4 rounded-xl border border-leafDark/15">
          {result.guidance.map((g, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800">
              <span className="w-5 h-5 rounded-full bg-loginGreen text-white text-[11px] flex items-center justify-center shrink-0">{i + 1}</span>
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200 flex items-start gap-2.5 text-xs text-gray-600 mb-5">
        <HelpCircle className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
        <p><strong>Disclaimer:</strong> AI predictions are for screening only and not a confirmed botanical diagnosis.</p>
      </div>
      <button type="button" onClick={onAnalyzeAnother} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-loginGreen text-white text-xs sm:text-sm font-medium">
        <RefreshCw className="w-4 h-4" /><span>Analyze Another Leaf</span>
      </button>
    </section>
  );
}