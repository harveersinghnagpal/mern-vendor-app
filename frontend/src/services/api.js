import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Proxy will handle the base URL
});

export default api;