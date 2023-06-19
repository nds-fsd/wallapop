import React, { useContext } from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/images/logo-retrend.png";
import imageDark from "../../../assets/images/logo-retrend-dark.png";
import Buscador from "../Buscador";
import styles from "./index.module.css";
import stylesDark from "./indexDark.module.css";
import { ThemeContext } from "../../../context/themeContext";

const Logout = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? stylesDark.navbar : styles.navbar}>
      <Link to="/">
        <div className={darkMode ? stylesDark.logoLink : styles.logoLink}>
          <img src={darkMode ? imageDark : image} alt="logo" />
        </div>
      </Link>
      <Buscador />
      <div className={darkMode ? stylesDark.buttonLink : styles.buttonLink}>
        <div className={darkMode ? stylesDark.darkMode : styles.darkMode}>
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
