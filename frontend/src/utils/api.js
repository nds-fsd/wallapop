import axios from "axios";

const URL_API =
  window.location === "retrend.netlify.app"
    ? "https://retrend-production.up.railway.app"
    : "http://localhost:3001";

export const api = axios.create({
  baseURL: URL_API,
  headers: { "Content-Type": "application/json" },
});
