import React from "react";
import { Outlet } from "react-router-dom";
import style from "../index.module.css";
import styles from "./messages.module.css";
import ChatList from "./chatList";
import { useQuery } from "react-query";
import { getAllChats } from "../../../utils/apiChatRoom";
import { getUserData } from "../../../utils/localStorage.utils";

const Messages = () => { 
  const {id} = getUserData

  const { data: allChats } = useQuery(["chats"], getAllChats);


  return (
    <div className={style.navPageContainer}>
      <div>
        <h1>Buzón</h1>
      </div>
      {allChats?.length > 0 ? (
      <div className={styles.chatContainer}>
        <div className={styles.outlet}>
          <Outlet />
        </div>

        <div className={styles.chatList}>
          <ChatList />
        </div>
      </div>) : (
        <div className={styles.sinProducts}>
          <h3>Sin mensajes todavía </h3>
          <h5>Encuentra algo que te guste y empieza una conversación.</h5>
        </div>
      )}
    </div>
  );
};

export default Messages;
