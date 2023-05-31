import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Buscador from "../Buscador";
import styles from "./index.module.css";
import { TbMessages } from "react-icons/tb";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AuthContext } from "../../../context/authContext";
import logo from "../../../assets/images/logo-retrend.png";

const Login = () => {
  const { userData } = useContext(AuthContext);
  if (!userData) return null;

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <div className={styles.logoLink}>
          <img src={logo} />{" "}
        </div>
      </Link>
      <Buscador />
      <div className={styles.buttonLink}>
        <Link to="/user/favorites">
          {" "}
          <MdOutlineFavoriteBorder /> FAVORITOS{" "}
        </Link>
        <Link to="/user/messages">
          {" "}
          <TbMessages /> BUZÓN{" "}
        </Link>
        <div data-test="perfil" className={styles.tuButton}>
          <Link to="/user/profile/info">
            {" "}
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
