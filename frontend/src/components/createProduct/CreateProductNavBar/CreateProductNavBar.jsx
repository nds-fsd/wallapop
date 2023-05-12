import React from "react";
import styles from "./createProductNavBar.module.css";
import { Link, Outlet } from "react-router-dom";
import imgCat from "../../../assets/imgCat";

const CreateProductNavBar = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>¿Qué quieres subir hoy?</h1>
        <h3>ReTrend relanza casi todo lo que imaginas</h3>
        <div className={styles.selector}>
          <Link to="algo-que-no-utilizo" className={styles.vertical}>
            <button className={styles.selection1}>
              <span className="icon-todo"></span>
            </button>
            <p className={styles.tags}>Algo que no utilizo</p>
          </Link>
          <Link to="inmueble" className={styles.vertical}>
            <button className={styles.selection}>
              <span className="icon-inmobiliaria"></span>
            </button>
            <p className={styles.tags}>Inmueble</p>
          </Link>
          <Link to="vehiculo" className={styles.vertical}>
            <button className={styles.selection2}>
              <span className="icon-coches"></span>
            </button>
            <p className={styles.tags}>Vehículo</p>
          </Link>
          <Link to="servicio-empleo" className={styles.vertical}>
            <button className={styles.selection}>
              <span className="icon-empleo"></span>
            </button>
            <p className={styles.tags}>Servicio / Empleo</p>
          </Link>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CreateProductNavBar;
