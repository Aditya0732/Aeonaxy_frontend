import axios from 'axios';

const api = axios.create({
  baseURL: 'https://aeonaxy-backend-dug0.onrender.com/api',
  withCredentials: true, // Include credentials in requests
});

export default api;
