import { api } from "./api";

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


