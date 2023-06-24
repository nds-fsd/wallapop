import { api } from "./api";

export const getProductByChatRoom = (data) => {
  const token = JSON.parse(localStorage.getItem("user-session"));
  const params = data.queryKey[1];
  // console.log("API CHATROOM:", params);
  return api
    .get(`/chat-room/product/${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const getAllChats = (data) => {
  const token = JSON.parse(localStorage.getItem("user-session"));

  return api
    .get("/chat-room", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const postChatRoom = (data) => {
  const token = JSON.parse(localStorage.getItem("user-session"));
  // console.log("token", token);
  // console.log("data en el api", data);
  return api
    .post(`/chat-room`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return {
        error: "Sorry, we couldn't post your chat room.",
      };
    });
};

export const deleteChatRoom = (id) => {
  const token = JSON.parse(localStorage.getItem("user-session"));
  return api
    .delete(`/chat_room/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};
