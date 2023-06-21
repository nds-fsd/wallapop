import React from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "../index.module.css";

const Purchases = () => {
  return (
    <div className={styles.navPageContainer}>
      <h1>Compras</h1>
      <div className={styles.linkPageContainer}>
        {/* <Link to="ongoing"> En Curso </Link> */}
        <Link to="completed"> Completadas </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Purchases;
