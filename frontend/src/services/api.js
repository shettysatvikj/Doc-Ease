import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
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
