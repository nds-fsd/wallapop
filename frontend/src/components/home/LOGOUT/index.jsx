import React, { useContext } from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/images/logo-retrend.png";
import Buscador from "../Buscador";
import styles from "./index.module.css";
import { ThemeContext } from "../../../context/themeContext";

const Logout = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className={styles.navbar}>
      <Link to="/">
        <div className={styles.logoLink}>
          <img src={image} alt="logo" />
        </div>
      </Link>
      <Buscador />
      <div className={styles.buttonLink}>
        <div className={styles.darkMode}>
          <div onClick={toggleDarkMode}>
            <span className={darkMode ? "icon-sun" : "icon-contrast"} />
          </div>
        </div>
        <Link data-test="login" to="/login">
          {" "}
          INICIA SESION{" "}
        </Link>
        <Link data-test="register" to="/register">
          {" "}
          REGISTRATE{" "}
        </Link>
      </div>
    </div>
  );
};
export default Logout;
