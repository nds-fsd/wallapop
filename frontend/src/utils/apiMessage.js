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

export const getCheckMessages = (something) => {
  const { queryKey } = something;
  const token = JSON.parse(localStorage.getItem("user-session"));

  return api
    .get(`/message/nocheck/${queryKey[1]}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const postMessage = (data) => {
  const token = JSON.parse(localStorage.getItem("user-session"));

  return api
    .post(`/message`, data, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return {
        error: "Sorry, we couldn't post your message.",
      };
    });
};

export const patchMessage = (chatId) => {
  const token = JSON.parse(localStorage.getItem("user-session"));

  return api
    .patch(
      `/message/${chatId}`,
      { check: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return { error: "Sorry, we couldn't patch your message" };
    });
};
