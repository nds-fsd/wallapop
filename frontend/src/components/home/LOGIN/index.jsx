import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Buscador from "../Buscador";
import styles from "./index.module.css";
import { TbMessages } from "react-icons/tb";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AuthContext } from "../../../context/authContext";
import image from "../../../assets/images/logo-retrend.png";
import imageDark from "../../../assets/images/logo-retrend-dark.png";
import { getAllChats } from "../../../utils/apiChatRoom";
import { useQuery } from "react-query";
import { ThemeContext } from "../../../context/themeContext";

const Login = () => {
  const { userData } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      navigate(localStorage.getItem("previousProductPage"));
      setTimeout(() => {
        localStorage.removeItem("previousProductPage");
      }, 2000);
    }
  }, [userData]);

  if (!userData) return null;
  const { data, isLoading } = useQuery(["chats"], getAllChats);

  return (
    <nav className={styles.navbar}>
      <div className={styles.nav}>
        <Link to="/">
          <div className={styles.logoLink}>
            <img src={darkMode ? imageDark : image} alt="logo" />{" "}
          </div>
        </Link>
        <Buscador to="/products/search" />
        <div className={styles.buttonLink}>
          <div className={styles.darkMode}>
            <div onClick={toggleDarkMode}>
              <span className={darkMode ? "icon-sun" : "icon-contrast"} />
            </div>
          </div>
          <Link to="/user/favorites">
            <MdOutlineFavoriteBorder /> FAVORITOS{" "}
          </Link>
          {!isLoading && (
            <Link to={`/user/messages/chatroom/${data?.[0]?._id}`}>
              <TbMessages /> BUZÓN{" "}
            </Link>
          )}
          {isLoading && (
            <Link to={`/user/messages`}>
              <TbMessages /> BUZÓN{" "}
            </Link>
          )}

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
            <Link to="/products/newproduct/">SUBIR UN PRODUCTO </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Login;
