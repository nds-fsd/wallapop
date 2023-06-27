import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import style from "../index.module.css";
import styles from "./messages.module.css";
import ChatList from "./chatList";
import { useQuery } from "react-query";
import { getAllChats } from "../../../utils/apiChatRoom";
import { getUserData, getUserToken } from "../../../utils/localStorage.utils";
import { io } from "socket.io-client";

const URL_API =
  window.location.hostname === "retrend.netlify.app"
    ? "https://retrend.up.railway.app/"
    : "http://localhost:3001";


const token = getUserToken();
const socket = io(URL_API, {
  path: "/private",
  reconnectionDelayMax: 10000,
  auth: {
    token,
  },
});

const Messages = () => {
  const { id } = getUserData;

  const { data: allChats } = useQuery(["chats"], getAllChats);
  useEffect(() => {
    socket.connect();
    socket.on("connection", (data) => {
      console.log("Connected");
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className={style.navPageContainer}>
      <div>
        <h1>Buzón</h1>
      </div>
      {allChats?.length > 0 ? (
        <div className={styles.chatContainer}>
          <div className={styles.outlet}>
            <Outlet context={{ socket }} />
          </div>

          <div className={styles.chatList}>
            <ChatList socket={socket} />
          </div>
        </div>
      ) : (
        <div className={styles.sinProducts}>
          <h3>Sin mensajes todavía </h3>
          <h5>Encuentra algo que te guste y empieza una conversación.</h5>
        </div>
      )}
    </div>
  );
};

export default Messages;
