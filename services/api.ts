import axios from "axios";

const API = axios.create({
  baseURL: "https://web-production-2f6b.up.railway.app/",
});

export default API;