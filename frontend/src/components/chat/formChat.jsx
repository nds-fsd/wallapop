import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { postMessage } from "../../utils/apiMessage";
import styles from "./chat-room.module.css";

const FormChat = () => {
  const params = useParams();
  const { chatRoomID } = params;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePostMessage = (message) => {
    const body = {
      chat_room_id: chatRoomID,
      body: message.message,
    };
    postMessage(body);
    reset();
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(handlePostMessage)();
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handlePostMessage)}
        className={styles.formContainer}
      >
        <textarea
          className={styles.textareaChat}
          placeholder="Escribe un mensaje..."
          {...register("message", {
            required: "Escribe un mensaje para el vendedor",
          })}
          onKeyDown={handleKeyDown}
        />

        <input value="Enviar" type="submit" />
      </form>
    </div>
  );
};

export default FormChat;
