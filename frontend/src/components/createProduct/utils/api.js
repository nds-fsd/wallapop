import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-type": "application/json" },
});

export const postProduct = async () => {
  await api
    .post("/products/newProduct")
    .then((res) => res.data)
    .catch((e) => console.log(e));
};
