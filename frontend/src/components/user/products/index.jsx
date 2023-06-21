import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "../index.module.css";
import ProductPublished from "./ProductPublished";

const Products = () => {
  return (
    <div className={styles.navPageContainer}>
      <h1>Productos</h1>
      <div className={styles.linkPageContainer}>
        <Link to="published"> Publicados </Link>
        <Link to="sold"> Vendidos </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Products;
