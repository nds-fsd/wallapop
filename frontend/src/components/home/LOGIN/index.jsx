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
import { LangContext } from "../../../context/idiomaContext";

const Login = () => {
  const { userData } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { esLang, toggleEsLang, langVariables } = useContext(LangContext);
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
        <div className={styles.darkMode}>
          <div onClick={toggleEsLang}>
            <span className={esLang ? "icon-music" : "icon-calculator1"} />
          </div>
        </div>
        <Link to="/user/favorites">
          {/* <MdOutlineFavoriteBorder /> FAVORITOS{" "} */}
          <MdOutlineFavoriteBorder /> {langVariables.buttonNavFav}{" "}
        </Link>
        {!isLoading && (
          <Link to={`/user/messages/chatroom/${data?.[0]?._id}`}>
            <TbMessages /> {langVariables.buttonNavBuzon}{" "}
          </Link>
        )}
        {isLoading && (
          <Link to={`/user/messages`}>
            <TbMessages /> {langVariables.buttonNavBuzon}{" "}
          </Link>
        )}

        {/* <Link to={`/user/messages/chatroom/${id}`}>
          <TbMessages /> BUZÓN{" "}
        </Link> */}
        <div data-test="perfil" className={styles.tuButton}>
          <Link to="/user/profile/info">
            <img src={userData.photo} />
            {langVariables.buttonNavTu}
          </Link>
        </div>
        <div className={styles.createProductButton}>
          <Link to="/products/newproduct/">{langVariables.buttonNavProd} </Link>
        </div>
      </div>
    </nav>
  );
};

export default Login;
