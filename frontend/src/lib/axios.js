import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "";

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;
