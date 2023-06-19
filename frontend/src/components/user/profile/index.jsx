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
import stylesDark from "./indexDark.module.css";
import { ThemeContext } from "../../../context/themeContext";

const Profile = () => {
  const { handleLogout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={
        darkMode ? stylesDark.profileContainer : styles.profileContainer
      }
    >
      <div className={darkMode ? stylesDark.profileTitle : styles.profileTitle}>
        <h1>Tu perfil</h1>
        <h4>Aqui puedes ver y editar los datos de tu perfil</h4>
      </div>
      <div
        className={darkMode ? stylesDark.navbarProfile : styles.navbarProfile}
      >
        <div
          className={darkMode ? stylesDark.linksProfile : styles.linksProfile}
        >
          <Link to={PROFILE_INFO}>Perfil</Link>
          <Link to={PROFILE_ACCOUNT}>Cuenta</Link>
          <Link to={PROFILE_VALUES}>Valoraciones</Link>
        </div>
        <div
          className={darkMode ? stylesDark.logoutButton : styles.logoutButton}
        >
          <button onClick={handleLogout}>Cerrar sesion</button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
