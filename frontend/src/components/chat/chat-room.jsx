import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { getChatRoomID } from "../../utils/apiChatRoom";
import { getMessageByChatRoom, postMessage } from "../../utils/apiMessage";
import styles from "./chat-room.module.css";
import {io} from "socket.io-client";
import { getUserToken } from "../../utils/localStorage.utils";

const token = getUserToken();
const socket = io("ws://localhost:3001", {
  path: "/private",
  reconnectionDelayMax: 10000,
  auth: {
    token,
  }
});

const ChatRoom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const params = useParams();
  const { chatRoomID } = params;
  const { data } = useQuery(["message", chatRoomID], getMessageByChatRoom);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [storedMessages, setStoredMessages] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.on("connection", (data) => {
      console.log("Connected");
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const receivedMessage = (message) => {
      const parsedMessage = {
        ...message,
        user:
          message.user._id === getUserSession().id
            ? "Yo"
            : message.user.firstName,
      };
      setMessages([...messages, parsedMessage]);
    };

      socket.emit("join-chat", chatRoomID);
      socket.on("chat-joined", (data) => {
        console.log(`Joined chat: ${data}`);
      });
      socket.on("NEW_MESSAGE", receivedMessage);
    

    //Desuscribimos el estado del componente cuando ya no es necesario utilizarlo
    return () => {
      socket.off("NEW_MESSAGE", receivedMessage);
    };
  }, [messages, socket]);


  const handlePostMessage = (message) => {
    const body = {
      chat_room_id: chatRoomID,
      body: message.message,
    };
    postMessage(body);
    // setMessage(body.body)
  };

  return (
    <div>
      <div className={styles.chatroomContainer}>
       
        {data?.map((message)=>{
         return (<div>
            <p>{message.body}</p>
          </div>)

        })}

        <form
          onSubmit={handleSubmit(handlePostMessage)}
          className={styles.formContainer}
        >
          <input
            type="text-area"
            placeholder="Dile algo al vendedor..."
            {...register("message", {
              required: "Escribe un mensaje para el vendedor",
            })}
          />

          <input value="Enviar" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
