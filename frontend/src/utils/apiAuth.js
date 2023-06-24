import { api } from "./api";
import { deleteStorageObject } from "./localStorage.utils";

export const createUser = (user) => {
  return api
    .post("/user/register", user)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const loginUser = (user) => {
  return api
    .post("/user/login", user)
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

export const modUser = (user) => {
  const token = JSON.parse(localStorage.getItem("user-session"));
  const userId = localStorage.getItem("user");
  const id = JSON.parse(userId).id;
  return api
    .patch(`/user/${id}`, user, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

export const deleteUser = (user) => {
  const token = JSON.parse(localStorage.getItem("user-session"));
  const userId = localStorage.getItem("user");
  const id = JSON.parse(userId).id;
  return api
    .delete(`/user/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      //eliminamos el user-session para borrar los datos del usuario
      deleteStorageObject("user-session"),
        deleteStorageObject("user"),
        res.data;
    })
    .catch((e) => console.log(e))
    .finally(console.log("ADEU hasta la proxima"));
};
