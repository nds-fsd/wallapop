import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query"
import { AuthContext } from "../../context/authContext";
import { getMessageByChatRoom } from "../../utils/apiMessage"
import styles from "./chat-room.module.css"



const ChatRoom = ({chatRoomId}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const { userData } = useContext(AuthContext);


    const { data } = useQuery(["message", chatRoomId], getMessageByChatRoom)
    
    const handlePostMessage = (data) => {
        const body = {
          chat_room_id: chatRoomId,
          user_id: userData.id,
          body: data.message,
          };
      postMessage(body);      
    }

  return (
    <div>
      <div className={styles.chatroomContainer}>

        {data}

        <form
        onSubmit={handleSubmit(handlePostMessage)}
        className={styles.formContainer}>

          <input 
          type="text-area" 
          placeholder="Dile algo al vendedor..." 
          {...register("message", {
            required: "Escribe un mensaje para el vendedor",
          })}/>

          <input 
          value="Enviar"
          type="submit" />
        </form>
      </div>
    </div>
  )
}

export default ChatRoom