import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://timus-backend.onrender.com", // Backend API URL
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("timus-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default apiClient;
