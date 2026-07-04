import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('aqua_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('aqua_token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

// Auth
export const authAPI = {
  login: (data) => api.post('/api/auth/login', data),
  register: (data) => api.post('/api/auth/register', data),
  forgotPassword: (email) => api.post('/api/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/api/auth/reset-password', data),
  me: () => api.get('/api/auth/me'),
  loginGoogle: () => `${BASE_URL}/api/auth/google`,
  loginGithub: () => `${BASE_URL}/api/auth/github`,
};

// Predictions
export const predictAPI = {
  crop: (data) => api.post('/api/predict/crop', data),
  yield: (data) => api.post('/api/predict/yield', data),
  water: (data) => api.post('/api/predict/water', data),
  reservoir: (data) => api.post('/api/predict/reservoir', data),
  advisory: (data) => api.post('/api/predict/advisory', data),
};

// Dashboard
export const dashboardAPI = {
  stats: () => api.get('/api/dashboard/stats'),
  weather: (lat, lon) => api.get(`/api/weather?lat=${lat}&lon=${lon}`),
  history: () => api.get('/api/dashboard/history'),
};

// Profile
export const profileAPI = {
  get: () => api.get('/api/profile'),
  update: (data) => api.put('/api/profile', data),
  savedPredictions: () => api.get('/api/profile/predictions'),
  activityHistory: () => api.get('/api/profile/activity'),
};

export default api;
