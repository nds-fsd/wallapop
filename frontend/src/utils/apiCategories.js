import axios from "axios";
import { useQueryClient } from "react-query";

export const apiCategory = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});
