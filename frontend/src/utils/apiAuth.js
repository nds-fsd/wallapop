import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});

export const loginUser = (user) => {
  return api
    .post("/user/login", user)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const createUser = (user) => {
  return api
    .post("/user/register", user)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};
