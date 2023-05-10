import axios from "axios";
import { useQueryClient } from "react-query";

export const getCategories = () => {
  return api
    .get(`/category`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
};
