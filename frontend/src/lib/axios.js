// lib/axios.ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token); // Debug log
  if (token) {
    config.headers.token = token;
  }
  console.log("Request headers:", config.headers); // Debug log
  return config;
});
