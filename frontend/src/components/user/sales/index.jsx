import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "../index.module.css";

const Sales = () => {
  return (
    <div className={styles.navPageContainer}>
      <h1>Ventas</h1>
      <div className={styles.linkPageContainer}>
        {
          /* <Link to="ongoing"> En Curso </Link>*/
          // <Link to="completed"> Completadas </Link>
        }
      </div>
      <Outlet />
    </div>
  );
};

export default Sales;
