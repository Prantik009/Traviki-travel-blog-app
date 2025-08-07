// utils/axios.js
import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5005/api"
    : "https://traviki-travel-blog-app-backend.onrender.com/api";

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
