import React from "react";
import { Route, Routes, Outlet, Link, Navigate } from "react-router-dom";

const Purchases = () => {
  return (
    <div>
      <h1>Compras</h1>
      <Link to="ongoing"> En Curso </Link>
      <Link to="completed"> Completadas </Link>
      <Outlet />
    </div>
  );
};

export default Purchases;
