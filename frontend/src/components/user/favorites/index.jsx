import React from "react";
import { Route, Routes, Outlet, Link, Navigate } from "react-router-dom";

const Favorites = () => {
  return (
    <div>
      <h1>Favoritos</h1>
      <Link to="products"> Productos </Link>
      <Link to="profiles"> Perfiles </Link>
      <Link to="searches"> Busquedas </Link>
      <Outlet />
    </div>
  );
};

export default Favorites;