import axios from "axios";

const API = axios.create({
  baseURL: "https://doc-ease-1.onrender.com", // backend URL
  withCredentials: true, // if you use cookies
});

// Add Authorization header automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
