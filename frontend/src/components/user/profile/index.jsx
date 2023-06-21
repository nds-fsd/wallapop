import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { getUserData, removeSession } from "../../../utils/localStorage.utils";
import {
  PROFILE_ACCOUNT,
  PROFILE_INFO,
  PROFILE_VALUES,
  USER_PROFILE,
} from "../route-paths";
import styles from "./index.module.css";

const Profile = () => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileTitle}>
        <h1>Tu perfil</h1>
        <h4>Aqui puedes ver y editar los datos de tu perfil</h4>
      </div>
      <div className={styles.navbarProfile}>
        <div className={styles.linksProfile}>
          <Link to={PROFILE_INFO}>Perfil</Link>
          <Link to={PROFILE_ACCOUNT}>Cuenta</Link>
          <Link to={PROFILE_VALUES}>Valoraciones</Link>
        </div>
        <div className={styles.logoutButton}>
          <button onClick={handleLogout}>Cerrar sesion</button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
