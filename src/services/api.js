// Direct Render Backend URL — no .env issues!
const BASE_URL = 'https://crop-backend-r14q.onrender.com/api/v1';

async function request(method, endpoint, data = null, customConfig = {}) {
  const token =
    localStorage.getItem('token') ||
    sessionStorage.getItem('token');

  const isFormData = data instanceof FormData;
  const headers = { ...(customConfig.headers || {}) };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  } else {
    // FormData ke liye browser khud boundary set karta hai
    delete headers['Content-Type'];
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  const response = await fetch(`${BASE_URL}${cleanEndpoint}`, {
    method,
    headers,
    body: isFormData ? data : data ? JSON.stringify(data) : undefined,
  });

  let responseData = null;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    responseData = await response.json();
  }

  if (!response.ok) {
    const error = new Error(
      responseData?.message ||
      responseData?.error ||
      `Request failed with status ${response.status}`
    );
    error.response = { status: response.status, data: responseData };
    throw error;
  }

  return { data: responseData, status: response.status };
}

const API = {
  get: (url, config) => request('GET', url, null, config),
  post: (url, data, config) => request('POST', url, data, config),
  put: (url, data, config) => request('PUT', url, data, config),
  patch: (url, data, config) => request('PATCH', url, data, config),
  delete: (url, config) => request('DELETE', url, null, config),
};

export default API;