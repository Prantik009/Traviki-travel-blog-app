// utils/axios.js
import axios from "axios";


export default axios.create({
  baseURL: import.meta.env.MODE === "development" ?  "http://localhost:5005/api" :"https://traviki-travel-blog-app-backend.onrender.com/api",
  withCredentials: true,
});
