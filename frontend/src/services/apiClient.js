import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://mini-task-tracker-wiis.onrender.com/api',
  timeout: 10000,
});

export default apiClient;
