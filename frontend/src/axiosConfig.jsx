import axios from 'axios';
import { getCSRFToken } from './csrftoken';

// Set up Axios with the CSRF token in headers
const api = axios.create({
  baseURL: '/backend/api/',
  headers: {
    'X-CSRFToken': getCSRFToken(),
  },
});

// Update CSRF token for each request if it changes
api.interceptors.request.use((config) => {
  config.headers['X-CSRFToken'] = getCSRFToken();
  return config;
});

export default api;