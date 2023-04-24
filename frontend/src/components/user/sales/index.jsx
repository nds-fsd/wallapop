import React from "react";
import { Route, Routes, Outlet, Link, Navigate } from "react-router-dom";

const Sales = () => {
  return (
    <div>
      <Link to="ongoing"> En Curso </Link>
      <Link to="completed"> Completadas </Link>
      <Outlet />
    </div>
  );
};

export default Sales;
