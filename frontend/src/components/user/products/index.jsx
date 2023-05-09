import React from "react";
import { Outlet, Link } from "react-router-dom";
import style from "../index.module.css";

const Products = () => {
  return (
    <div className={style.navPageContainer}>
      <h1>Productos</h1>
      <div className={style.linkPageContainer}>
        <Link to="published"> Publicados </Link>
        <Link to="sold"> Vendidos </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Products;
