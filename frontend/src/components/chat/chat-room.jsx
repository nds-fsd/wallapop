import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useParams, useOutletContext } from "react-router-dom";
import { getMessageByChatRoom, postMessage } from "../../utils/apiMessage";
import styles from "./chat-room.module.css";
import { getUserData, getUserToken } from "../../utils/localStorage.utils";
import ChatHeader from "./chat-header";
import FormChat from "./formChat";
import { BsCheckAll } from "react-icons/bs";

const ChatRoom = () => {
  const { socket } = useOutletContext();
  const messagesContainerRef = useRef(null);
  const params = useParams();

  const { chatRoomID } = params;
  const { data } = useQuery(["message", chatRoomID], getMessageByChatRoom);
  const { id } = getUserData();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(data);
  }, [data]);

  useEffect(() => {
    const receivedMessage = (message) => {
      if (message.chat_room_id === chatRoomID) {
        setMessages([...messages, message]);
        scrollToBottom();
      }
    };
    socket.emit("join-chat", chatRoomID);
    socket.on("chat-joined", (data) => {
      console.log(`Joined chat: ${data}`);
    });
    socket.on("NEW_MESSAGE", receivedMessage);

    const markAsRead = () => {
      if (!!messages) {
        const readMessages = messages.map((message) => ({
          ...message,
          check: true,
        }));
        setMessages(readMessages);
      }
    };

    socket.on("READ_MESSAGES", markAsRead);

    return () => {
      socket.off("NEW_MESSAGE", receivedMessage);
    };
  }, [messages, socket]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({ block: "end" });
    }
  };

  return (
    <div>
      <div className={styles.chatroomContainer}>
        <ChatHeader chatRoomID={chatRoomID} />
        <div className={styles.messageContainer}>
          {messages?.map((message, i) => (
            <div
            key={message._id}
              className={`${
                message.user_id === id ? styles.myCheck : styles.otherCheck
              }`}
            >
              <div
                className={`${
                  message.user_id === id
                    ? styles.myMessage
                    : styles.otherMessage
                }`}
                key={i}
              >
                {message.body}
              </div>
              {message.check === true && <BsCheckAll />}
            </div>
          ))}
          <div ref={messagesContainerRef} />
        </div>

        <FormChat />
      </div>
    </div>
  );
};

export default ChatRoom;
