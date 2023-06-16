import { api } from "./api";

export const getChatRoomID = (data) => {
  const token = JSON.parse(localStorage.getItem("user-session"));
  const params = data.queryKey[1];
  const {buyerid, productid} = params

  return api
    .get(`/chat-room/${buyerid}/${productid}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    } )
    .then((res)=> res.data)
    .catch((error) => {
      console.log(error)
      return {
        error:
        "Sorry, we couldn't found this chatroom"
      }
    })
}

export const postChatRoom = (data) => {
  const token = JSON.parse(localStorage.getItem("user-session"));


    return api
      .post(`/chat-room`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.log(error)
        return {
          error:
            "Sorry, we couldn't post your chat room.",
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