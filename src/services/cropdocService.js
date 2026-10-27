import API from './api';

// ==========================================
// 1. AUTHENTICATION APIs
// ==========================================
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const googleLogin = (googleTokenData) => API.post('/auth/google', googleTokenData);

// ==========================================
// 2. USER PROFILE APIs
// ==========================================
export const getMyProfile = () => API.get('/users/me');
export const updateMyProfile = (data) => API.patch('/users/me', data);
export const getMyPreferences = () => API.get('/users/me/preferences');
export const updateMyPreferences = (data) => API.put('/users/me/preferences', data);

// ==========================================
// 3. CROPS APIs
// ==========================================
export const getAllCrops = () => API.get('/crops');
export const getCropById = (id) => API.get(`/crops/${id}`);

// ==========================================
// 4. PREDICTIONS (SCANNING) APIs
// ==========================================
export const createPrediction = (formData) => {
  return API.post('/predictions', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }, // Kyunki isme image jayegi
  });
};
export const getPredictionsList = (page = 0, size = 20) => API.get(`/predictions?page=${page}&size=${size}`);
export const getPredictionById = (id) => API.get(`/predictions/${id}`);
export const deletePrediction = (id) => API.delete(`/predictions/${id}`);

// ==========================================
// 5. DOCS APIs (Mostly for testing/developers)
// ==========================================
export const getDocs = () => API.get('/docs');
export const getOpenApiDocs = () => API.get('/docs/openapi.json');