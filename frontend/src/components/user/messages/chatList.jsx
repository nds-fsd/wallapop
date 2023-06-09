import { useQuery } from "react-query";
import { getAllChats } from "../../../utils/apiChatRoom";
import ChatListItem from "./chatListItem";
import styles from "./chatList.module.css";

const ChatList = ({ socket }) => {
  const { data: allChats } = useQuery(["chats"], getAllChats);

  return (
    <div className={styles.chatListContainer}>
      <h1>Chats</h1>
      {allChats?.map((data, i) => {
        return <ChatListItem socket={socket} key={data._id} data={data} />;
      })}
    </div>
  );
};

export default ChatList;
