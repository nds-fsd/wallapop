import React from "react";
import { Outlet } from "react-router-dom";
import style from "../index.module.css";
import styles from "./messages.module.css";
import ChatList from "./chatList";

const Messages = () => {
  return (
    <div className={style.navPageContainer}>
      <div>
        <h1>Buzón</h1>
      </div>
      <div className={styles.chatContainer}>
        <div className={styles.outlet}>
          <Outlet />
        </div>

        <div className={styles.chatList}>
          <ChatList />
        </div>
      </div>
    </div>
  );
};

export default Messages;
