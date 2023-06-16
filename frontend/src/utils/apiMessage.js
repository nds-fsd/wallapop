import { api } from "./api";
import { getUserData } from "./localStorage.utils";

export const getMessageByChatRoom = ({ queryKey }) => {
  const token = JSON.parse(localStorage.getItem("user-session"));

  return api
    .get(`/message/${queryKey[1]}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const postMessage = (data) => {
    const { id } = getUserData();
    const token = JSON.parse(localStorage.getItem("user-session"));

    return api
      .post(`/message`, data,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log('mensaje post', res.data))
      .catch((error) => {
        console.log(error)
        return {
          error:
            "Sorry, we couldn't post your message.",
        };
      });
  };