import React from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/images/logo-retrend.png";
import Buscador from "../Buscador";
import styles from "./index.module.css"
import { TbMessages } from "react-icons/tb";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import imageProfile from "../../../assets/images/pexels-pixabay-415829.jpg"


const Login = () => {
return(
<nav className={styles.navbar}>
        <Link to="/">
            <div className={styles.logoLink}>
                <img src={image} />
            </div>
        </Link>
        <Buscador />
        <div className={styles.buttonLink}>
            <Link to="/user/favorites"> <MdOutlineFavoriteBorder /> FAVORITOS </Link>
            <Link to="/user/messages"> <TbMessages /> BUZÓN </Link>
            <div className={styles.tuButton}>
                <Link to="/user"> <img src={imageProfile} /> TÚ</Link>
            </div>
            <div className={styles.createProductButton}>
                <Link to="/products/newproduct">SUBIR UN PRODUCTO </Link>
            </div>
        </div>
</nav>
)};

 export default Login;