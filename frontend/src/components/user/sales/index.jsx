import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "../index.module.css";
import stylesDark from "../indexDark.module.css";
import { ThemeContext } from "../../../context/themeContext";

const Sales = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={
        darkMode ? stylesDark.navPageContainer : styles.navPageContainer
      }
    >
      <h1>Ventas</h1>
      <div
        className={
          darkMode ? stylesDark.linkPageContainer : styles.linkPageContainer
        }
      >
        {
          /* <Link to="ongoing"> En Curso </Link>*/
          <Link to="completed"> Completadas </Link>
        }
      </div>
      <Outlet />
    </div>
  );
};

export default Sales;
