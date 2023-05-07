import React from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/images/logo-retrend.png";
import styles from "./index.module.css"


const Logout = () => {
return(
<div className={styles.navbar}>
        <Link to="/">
            <div className={styles.logoLink}>
                <img src={image} />
            </div>
        </Link>
        <div className={styles.buttonLink}>
            <button><Link to="/login"> Regístrate o inicia sesión </Link></button>
         </div>
</div>
)};
export default Logout;
