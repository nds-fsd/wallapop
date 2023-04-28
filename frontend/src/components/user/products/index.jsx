import React from "react";
import { Outlet, Link } from "react-router-dom";

const Products = () => {
  return (
    <div>
      <h1>Productos</h1>
      <Link to="published"> Publicados </Link>
      <Link to="sold"> Vendidos </Link>
      <Outlet />
    </div>
  );
};

export default Products;
