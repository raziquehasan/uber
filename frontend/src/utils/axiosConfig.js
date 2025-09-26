import axios from 'axios';

// Debug environment variables
console.log('VITE_BASE_URL:', import.meta.env.VITE_BASE_URL);

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || localStorage.getItem('captain-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Making request to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response?.status === 401) {
      // Clear tokens and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('captain-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Override default axios with our configured instance
Object.setPrototypeOf(axios, axiosInstance);
Object.defineProperty(axios, 'create', {
  value: axiosInstance.create.bind(axiosInstance),
  writable: false
});

export default axiosInstance;
