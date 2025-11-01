import Cookie from "js-cookie";
import axios from "axios";

// Pull from Vite environment
const apiUrl = import.meta.env.VITE_API_URL;
const env = import.meta.env.VITE_ENV;
console.log("base_API===-->",apiUrl)
const api = axios.create({
  baseURL: apiUrl,
});

// Add token if exists
const token = localStorage.getItem("authToken");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;
