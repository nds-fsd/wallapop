import React, { useContext } from "react";
import styles from "./product.module.css";
import stylesDark from "./productDark.module.css";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../../context/themeContext";

const Product = ({ prod }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    // creo los datos que recibo(prod) que vamos a mostrar en cada card de producto
    <NavLink
      to={"/category/product/" + prod._id}
      data-test="product"
      className={darkMode ? stylesDark.container : styles.container}
    >
      <div className={darkMode ? stylesDark.card : styles.card}>
        <div className={darkMode ? stylesDark.columnLeft : styles.columnLeft}>
          {prod.images.length > 0 ? (
            <div
              className={
                darkMode ? stylesDark.imagesContainer : styles.imagesContainer
              }
            >
              <img
                src={prod.images[0]}
                className={darkMode ? stylesDark.image : styles.image}
              ></img>
            </div>
          ) : (
            <div className={darkMode ? stylesDark.noImage : styles.noImage}>
              <span className="icon-sad"></span>
              <p>Lo sentimos, no hay imágenes para mostrar</p>
            </div>
          )}
        </div>
        <div className={darkMode ? stylesDark.columnRight : styles.columnRight}>
          <h4>{prod.price.toLocaleString("es-ES", { useGrouping: true })} €</h4>
          <h6>{prod.title}</h6>
          <p>{prod.description}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
