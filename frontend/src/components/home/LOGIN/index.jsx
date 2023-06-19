import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Buscador from "../Buscador";
import styles from "./index.module.css";
import stylesDark from "./indexDark.module.css";
import { TbMessages } from "react-icons/tb";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AuthContext } from "../../../context/authContext";
import image from "../../../assets/images/logo-retrend.png";
import imageDark from "../../../assets/images/logo-retrend-dark.png";
import { ThemeContext } from "../../../context/themeContext";

const Login = () => {
  const { userData } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  if (!userData) return null;

  return (
    <nav className={darkMode ? stylesDark.navbar : styles.navbar}>
      <Link to="/">
        <div className={darkMode ? stylesDark.logoLink : styles.logoLink}>
          <img src={darkMode ? imageDark : image} alt="logo" />
        </div>
      </Link>
      <Buscador to="/products/search" />
      <div className={darkMode ? stylesDark.buttonLink : styles.buttonLink}>
        <div className={darkMode ? stylesDark.darkMode : styles.darkMode}>
          <div onClick={toggleDarkMode}>
            <span className={darkMode ? "icon-sun" : "icon-contrast"} />
          </div>
        </div>
        <Link to="/user/favorites">
          <MdOutlineFavoriteBorder /> FAVORITOS{" "}
        </Link>
        <Link to="/user/messages">
          <TbMessages /> BUZÓN{" "}
        </Link>
        <div
          data-test="perfil"
          className={darkMode ? stylesDark.tuButton : styles.tuButton}
        >
          <Link to="/user/profile/info">
            <img src={userData.photo} />
            TÚ
          </Link>
        </div>
        <div
          className={
            darkMode
              ? stylesDark.createProductButton
              : styles.createProductButton
          }
        >
          <Link to="/products/newproduct/algo-que-no-utilizo">
            SUBIR UN PRODUCTO{" "}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Login;
