import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://mern-vendor-app.onrender.com",
});

export default api;
