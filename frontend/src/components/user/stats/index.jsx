import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "../index.module.css";

const Stats = () => {
  return (
    <div className={styles.navPageContainer}>
      <h1>Estadísticas</h1>
      <div className={styles.linkPageContainer}>
      <Link to="purchases-completed"> Compras </Link>
      <Link to="sales-completed"> Ventas </Link>

      </div>
      <Outlet />
    </div>
  );
};

export default Stats;
