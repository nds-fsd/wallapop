import { api } from "./api";

export const postChatRoom = (data) => {

    return api
      .post(`/chat-room`, data)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error)
        return {
          error:
            "Sorry, we couldn't post your chat room.",
        };
      });
  };