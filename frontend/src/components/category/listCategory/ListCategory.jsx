import React, { useContext } from "react";
import styles from "./listCategory.module.css";
import stylesDark from "./listCategoryDark.module.css";
import { getCategories } from "../../../utils/apiCategories";
import { useQuery } from "react-query";
import { NavLink, Outlet } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import { ThemeContext } from "../../../context/themeContext";

const ListCategory = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  // Hago peticion a BD para obtener todas las categorias
  const { data: categories, isLoading } = useQuery(["category"], getCategories);
  return (
    <div className={darkMode ? stylesDark.container : styles.container}>
      {/* si no ha cargado las categorias muestra esto */}
      {isLoading && (
        <div>
          <Spinner size="M" />
        </div>
      )}
      <div className={darkMode ? stylesDark.carusel : styles.carusel}>
        {!isLoading &&
          // bucle para mostrar todas las categorias que vienen de la BD
          categories.map((category) => {
            return (
              // Para que funcione el outlet declaro cada categoria con una navLink y le muestro la ruta que tiene que hacer
              // cada vez que se aprete ( el to="")
              <NavLink
                data-test="category"
                to={"/category/" + category.title}
                className={darkMode ? stylesDark.item : styles.item}
                key={category._id}
              >
                <span className={category.logo} />
                {category.title}
              </NavLink>
            );
          })}
      </div>
      {/* Aqui se mostrara lo que esta definido en la ruta (archivo app.jsx) como subCategoria de Categorias */}
      <Outlet />
    </div>
  );
};

export default ListCategory;
