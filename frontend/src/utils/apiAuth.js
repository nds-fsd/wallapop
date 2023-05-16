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

export const modUser = (user) => {
  const userId = localStorage.getItem("user");
  const id = JSON.parse(userId).id;
  console.log("id", id);
  return api
    .patch(`/user/${id}`, user)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const getInfoUser = (user) => {
  const userId = localStorage.getItem("user");
  const id = JSON.parse(userId).id;
  return api
    .get(`/user/${id}`, user)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const deleteUser = (user) => {
  const token = localStorage.getItem("user-session");
  const userId = localStorage.getItem("user");
  const id = JSON.parse(userId).id;
  console.log("id", id);
  return api
    .patch(`/user/${id}`, user, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((e) => console.log(e));
};
