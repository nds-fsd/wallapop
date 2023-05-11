import { api } from "./api";


export const getCategories = () => {
  return api
    .get(`/category`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
};
