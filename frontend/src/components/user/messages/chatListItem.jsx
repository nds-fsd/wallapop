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
  const { data: noCheckMessages } = useQuery(
    ["checkmessage", _id],
    getCheckMessages
  );

  const lastMessage = noCheckMessages?.pop(-1);

  const handleCheckMessage = (body) => {
    patchMessage(body);
  };

  return (
    <div>
      <Link
        to={`/user/messages/chatroom/${_id}`}
        className={styles.itemContainer}
        onClick={() => handleCheckMessage({ chat_room_id: _id, check: true })}
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
        {lastMessage?.check === false && lastMessage?.user_id !== id && (
          <div className={styles.newMessage}>
            <p>"</p>
          </div>
        )}
      </Link>
    </div>
  );
};

export default ChatListItem;
