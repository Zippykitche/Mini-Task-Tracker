import axios from 'axios';

// Shared Axios client for backend HTTP requests.
// Business-specific API calls should be added in taskService.js.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default apiClient;
