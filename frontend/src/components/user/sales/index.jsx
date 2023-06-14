import React from "react";
import { Outlet, Link } from "react-router-dom";
import style from "../index.module.css";

const Sales = () => {
  return (
    <div className={style.navPageContainer}>
      <h1>Ventas</h1>
      <div className={style.linkPageContainer}>
        {
          /* <Link to="ongoing"> En Curso </Link>*/
          <Link to="completed"> Completadas </Link>
        }
      </div>
      <Outlet />
    </div>
  );
};

export default Sales;
