import React, { useState, useContext } from "react";
import styles from "./listCategory.module.css";
import { getCategories } from "../../../utils/apiCategories";
import { useQuery } from "react-query";
import { NavLink, Outlet } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";

const ListCategory = () => {
  // Hago peticion a BD para obtener todas las categorias
  const { data: categories, isLoading } = useQuery(["category"], getCategories);

  const productsPerPage = 6;
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === categories.length - 1 ? 0 : currentIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex === 0 ? categories.length - 1 : currentIndex - 1
    );
  };
  // const displayedCategories =
  //   categories &&
  //   categories.slice(currentIndex, currentIndex + productsPerPage);

  const displayedCategories =
    categories &&
    categories
    .concat(categories.slice(0, productsPerPage))
    .slice(currentIndex, currentIndex + productsPerPage);


  return (
    <div className={styles.container}>
      {/* si no ha cargado las categorias muestra esto */}
      {isLoading && (
        <div>
          <Spinner size="M" />
        </div>
      )}
      <div className={styles.carusel}>
        <button onClick={handlePrevious} className={styles.seeMore}>
          <span className="icon-previous"></span>
        </button>
        {!isLoading &&
          // bucle para mostrar todas las categorias que vienen de la BD
          displayedCategories.map((category) => {
            return (
              // Para que funcione el outlet declaro cada categoria con una navLink y le muestro la ruta que tiene que hacer
              // cada vez que se aprete ( el to="")
              <NavLink
                data-test="category"
                to={"/category/" + category.title}
                className={styles.item}
                key={category._id}
              >
                <span className={category.logo} />
                {category.title}
              </NavLink>
            );
          })}
        <button onClick={handleNext} className={styles.seeMore}>
          <span className="icon-next"></span>
        </button>
      </div>

      {/* Aqui se mostrara lo que esta definido en la ruta (archivo app.jsx) como subCategoria de Categorias */}
      <Outlet />
    </div>
  );
};

export default ListCategory;
