import React from "react";
import styles from "./product.module.css";
import { NavLink } from "react-router-dom";

const Product = ({ prod }) => {
  return (
    // creo los datos que recibo(prod) que vamos a mostrar en cada card de producto
    <NavLink to={"/category/product/" + prod._id} data-test="product" className={styles.container}>
      <div className={styles.card}>
        <div className={styles.columnLeft}>
          <img src={prod.images}></img>
        </div>
        <div className={styles.columnRight}>
          <h4>{prod.price.toLocaleString('es-ES', {useGrouping: true}) } €</h4>
          <h6>{prod.title}</h6>
          <p>{prod.description}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
