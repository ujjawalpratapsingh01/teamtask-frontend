export async function predictLeaf(imageFile, selectedCrop = '') {
  await new Promise((r) => setTimeout(r, 900));
  return {
    id: `scan_${Date.now()}`,
    timestamp: new Date().toISOString(),
    crop: selectedCrop || 'Tomato',
    disease: 'Early Blight (Alternaria solani)',
    isHealthy: false,
    confidence: 91.4,
    uncertaintyStatus: 'Standard Confidence',
    isLowConfidence: false,
    guidance: [
      'Remove and safely dispose of visibly infected lower leaves.',
      'Water at the base of the plant rather than wetting foliage.',
      'Consult a local agricultural officer for region-approved fungicide guidance.'
    ],
    isSimulated: true
  };
}