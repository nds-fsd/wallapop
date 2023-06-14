import { api } from "./api";
import { getUserData, getUserToken } from "./localStorage.utils";

export const getTransactionsByUser = () => {
  const { id } = getUserData();
  const { token } = getUserToken();
  // console.log("el id", id);
  // console.log("el token", token);
  return api
    .get(`/transactions/getbyuser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return {
        error:
          "Sorry, we couldn't retrieve your products. Please try again later.",
      };
    });
};

export const postTransactions = (data) => {
  const { id } = getUserData();
  return api
    .post(`/transactions/newTransaction/${id}`, data)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return {
        error: "Sorry, we couldn't post your product.",
      };
    });
};
