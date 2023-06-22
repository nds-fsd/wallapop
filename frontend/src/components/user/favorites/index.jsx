import React from "react";
import { Route, Routes, Outlet, Link, Navigate } from "react-router-dom";
import style from "../index.module.css";

const Favorites = () => {
  return (
    <div className={style.navPageContainer}>
      <h1>Favoritos</h1>
      <div className={style.linkPageContainer}>
        {/* <Link to="products"> Productos </Link> */}
        {/* <Link to="profiles"> Perfiles </Link> */}
        {/* <Link to="searches"> Búsquedas </Link> */}
      </div>
      <Outlet />
    </div>
  );
};

export default Favorites;
