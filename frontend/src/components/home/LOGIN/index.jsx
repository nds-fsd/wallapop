import React from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/images/logo-retrend.png";
import styles from "./index.module.css"

const Login = () => {
return(
<nav className={styles.navbar}>
        <Link to="/">
            <div className={styles.logoLink}>
                <img src={image} />
            </div>
        </Link>
        <div className={styles.buttonLink}>
            <Link to="/user/favorite"><button> FAVORITOS </button></Link>
            <Link to="/user/message"><button > BUZÓN </button></Link>
            <Link to="/user"><button> TÚ </button></Link>
            <Link to="/createproduct"><button> SUBIR UN PRODUCTO </button></Link>
        </div>
</nav>
)};

 export default Login;