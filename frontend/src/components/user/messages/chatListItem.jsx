import { Link } from "react-router-dom";
import { getUserData, getUserToken } from "../../../utils/localStorage.utils";
import styles from "./chatListItem.module.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getCheckMessages, patchMessage } from "../../../utils/apiMessage";
import { useQuery } from "react-query";

const token = getUserToken();
const socket = io("http://localhost:3001", {
  path: "/private",
  reconnectionDelayMax: 10000,
  auth: {
    token,
  },
});

const ChatListItem = ({ data }) => {
  const { product_id: product, owner_id: owner, buyer_id: buyer, _id } = data;
  const { id } = getUserData();
  const { data: uncheckedMessages, refetch } = useQuery(
    ["checkmessage", _id],
    getCheckMessages
  );

  const handleCheckMessage = (chatId) => {
    patchMessage(chatId);
    refetch();
  };

  return (
    <div>
      <Link
        to={`/user/messages/chatroom/${_id}`}
        className={styles.itemContainer}
        onClick={() => handleCheckMessage(_id)}
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
          <p>{owner?._id !== id ? owner?.name : buyer?.name}</p>
          <h3>{product?.title}</h3>
        </div>
        {uncheckedMessages?.length > 0 && (
          <div className={styles.newMessage}>
            <p>"</p>
          </div>
        )}
      </Link>
    </div>
  );
};

export default ChatListItem;
