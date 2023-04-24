import React from "react";
import { Route, Routes, Outlet, Link, Navigate } from "react-router-dom";

const Products = () => {
  return (
    <div>
      <Link to="published"> Publicados </Link>
      <Link to="sold"> Vendidos </Link>
      <Outlet />
    </div>
  );
};

export default Products;
