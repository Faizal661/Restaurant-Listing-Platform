import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/restaurants`,
  withCredentials: true,
  timeout: 20000,
});

export default api;
