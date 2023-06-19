import React, { useContext } from "react";
import styles from "./createProductNavBar.module.css";
import stylesDark from "./createProductNavBarDark.module.css";
import { Link, Outlet } from "react-router-dom";
import { ThemeContext } from "../../../context/themeContext";

const CreateProductNavBar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <>
      <div className={darkMode ? stylesDark.container : styles.container}>
        <h1>¿Qué quieres subir hoy?</h1>
        <h4>ReTrend relanza casi todo lo que imaginas</h4>
        <div className={darkMode ? stylesDark.selector : styles.selector}>
          <Link
            to="algo-que-no-utilizo"
            className={darkMode ? stylesDark.vertical : styles.vertical}
          >
            <button
              className={darkMode ? stylesDark.selection1 : styles.selection1}
            >
              <span className="icon-varios"></span>
            </button>
            <p className={darkMode ? stylesDark.tags : styles.tags}>
              Algo que no utilizo
            </p>
          </Link>
          <Link
            to="inmueble"
            className={darkMode ? stylesDark.vertical : styles.vertical}
          >
            <button
              className={darkMode ? stylesDark.selection : styles.selection}
            >
              <span className="icon-inmobiliaria"></span>
            </button>
            <p className={darkMode ? stylesDark.tags : styles.tags}>Inmueble</p>
          </Link>
          <Link
            to="vehiculo"
            className={darkMode ? stylesDark.vertical : styles.vertical}
          >
            <button
              className={darkMode ? stylesDark.selection2 : styles.selection2}
            >
              <span className="icon-coches"></span>
            </button>
            <p className={darkMode ? stylesDark.tags : styles.tags}>Vehículo</p>
          </Link>
          <Link
            to="servicio-empleo"
            className={darkMode ? stylesDark.vertical : styles.vertical}
          >
            <button
              className={darkMode ? stylesDark.selection : styles.selection}
            >
              <span className="icon-empleo"></span>
            </button>
            <p className={darkMode ? stylesDark.tags : styles.tags}>
              Servicio / Empleo
            </p>
          </Link>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CreateProductNavBar;
