import React from "react";
import ChatRoom from "../../chat/chat-room";
import style from "../index.module.css";

const Messages = () => {
  //Aqui va el fetch al endpoint de mensajes

  return (
    <div className={style.navPageContainer}>
      <h1>Buzón</h1>
      <ChatRoom />
    </div>
  );
};

export default Messages;
