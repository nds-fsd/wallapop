import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "../index.module.css";
import stylesDark from "../indexDark.module.css";
import ProductPublished from "./ProductPublished";
import { ThemeContext } from "../../../context/themeContext";

const Products = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={
        darkMode ? stylesDark.navPageContainer : styles.navPageContainer
      }
    >
      <h1>Productos</h1>
      <div
        className={
          darkMode ? stylesDark.linkPageContainer : styles.linkPageContainer
        }
      >
        <Link to="published"> Publicados </Link>
        <Link to="sold"> Vendidos </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Products;
