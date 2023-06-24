import { Link } from "react-router-dom";
import { getUserData, getUserToken } from "../../../utils/localStorage.utils";
import styles from "./chatListItem.module.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const token = getUserToken();
const socket = io("http://localhost:3001", {
  path: "/private",
  reconnectionDelayMax: 10000,
  auth: {
    token,
  },
});

const ChatListItem = ({ data }) => {
  const { id } = getUserData();
  const [newMessage, setNewMessage] = useState(false);

  useEffect(() => {
    socket.connect();
    socket.on("connection", (data) => {
      console.log("Connected");
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const { product_id: product, owner_id: owner, buyer_id: buyer, _id } = data;

  useEffect(() => {
    const receivedMessage = (message) => {
      if (message.chat_room_id === _id) {
        setNewMessage(true);
      }
    };
    socket.on("NEW_MESSAGE", receivedMessage);

    return () => {
      socket.off("NEW_MESSAGE", receivedMessage);
    };
  }, [newMessage, socket]);

  return (
    <div>
      <Link
        to={`/user/messages/chatroom/${_id}`}
        className={styles.itemContainer}
        onClick={() => setNewMessage(false)}
      >
        <div>
          {product?.images && product.images.length > 0 ? (
            <img src={product?.images[0]} />
          ) : (
            <div className={styles.noImage}>
              <span className="icon-eye-blocked"></span>
            </div>
          )}
        </div>
        <div className={styles.chatData}>
          <p>{owner?.id !== id ? owner?.name : buyer?.name}</p>
          <p>{owner?.id === id ? buyer?.name : ""}</p>
          <h3>{product?.title}</h3>
        </div>
        {newMessage && (
          <div className={styles.newMessage}>
            <p>"</p>
          </div>
        )}
      </Link>
    </div>
  );
};

export default ChatListItem;
