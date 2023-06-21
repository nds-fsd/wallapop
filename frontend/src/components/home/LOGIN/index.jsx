import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Buscador from "../Buscador";
import styles from "./index.module.css";
import { TbMessages } from "react-icons/tb";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AuthContext } from "../../../context/authContext";
import logo from "../../../assets/images/logo-retrend.png";
import { getAllChats } from "../../../utils/apiChatRoom";
import { useQuery } from "react-query";

const Login = () => {
  const { userData } = useContext(AuthContext);
  if (!userData) return null;
  const { data, isLoading } = useQuery(["chats"], getAllChats);
  


  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <div className={styles.logoLink}>
          <img src={logo} />{" "}
        </div>
      </Link>
      <Buscador to="/products/search" />
      <div className={styles.buttonLink}>
        <Link to="/user/favorites">
          <MdOutlineFavoriteBorder /> FAVORITOS{" "}
        </Link>
      {!isLoading && <Link to={`/user/messages/chatroom/${data[0]?._id}`}>
          <TbMessages /> BUZÓN{" "}
        </Link>}
        {isLoading && <Link to={`/user/messages`}>
          <TbMessages /> BUZÓN{" "}
        </Link>}


        {/* <Link to={`/user/messages/chatroom/${id}`}>
          <TbMessages /> BUZÓN{" "}
        </Link> */}
        <div data-test="perfil" className={styles.tuButton}>
          <Link to="/user/profile/info">
            <img src={userData.photo} />
            TÚ
          </Link>
        </div>
        <div className={styles.createProductButton}>
          <Link to="/products/newproduct/algo-que-no-utilizo">
            SUBIR UN PRODUCTO{" "}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Login;
