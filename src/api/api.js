import axios from 'axios';

const api = axios.create({
  baseURL: 'https://aeonaxy-a-backend.onrender.com/api',
  withCredentials: true, // Include credentials in requests
});

export default api;
