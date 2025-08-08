// utils/axios.js
import axios from "axios";

const BASE_URL = "https://traviki-travel-blog-app-backend.onrender.com";

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
