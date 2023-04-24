import React from "react";
import { Outlet, Link } from "react-router-dom";

const Sales = () => {
  return (
    <div>
      <h1>Ventas</h1>
      <Link to="ongoing"> En Curso </Link>
      <Link to="completed"> Completadas </Link>
      <Outlet />
    </div>
  );
};

export default Sales;
