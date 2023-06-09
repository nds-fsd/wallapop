import React from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/images/logo-retrend.png";
import Buscador from "../Buscador";
import styles from "./index.module.css";

const Logout = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <div className={styles.logoLink}>
          <img src={image} />
        </div>
      </Link>
      <Buscador />
      <div className={styles.buttonLink}>
        <Link data-test="login" to="/login"> INICIA SESION </Link>
        <Link data-test="register" to="/register"> REGISTRATE </Link>
      </div>
    </div>
  );
};
export default Logout;
