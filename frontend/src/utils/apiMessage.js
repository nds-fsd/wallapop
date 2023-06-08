import { api } from "./api";

export const getMessageByChatRoom = ({queryKey}) => {
  return api
    .get(`/message/${queryKey[1]}`)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      return [];
    });
};

export const postMessage = (data) => {
    const { id } = getUserData();

    return api
      .post(`/message/${id}`, data)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error)
        return {
          error:
            "Sorry, we couldn't post your message.",
        };
      });
  };