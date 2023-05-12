import React from "react";
import styles from "./listCategory.module.css";
import { getCategories } from "../../../utils/apiCategories";
import { useQuery } from "react-query";
import { NavLink, Outlet } from "react-router-dom";

const ListCategory = () => {
  // Hago peticion a BD para obtener todas las categorias
  const { data: categories, isLoading } = useQuery(["category"], getCategories);
console.log(categories)
  return (
    <div className={styles.container}>
      {/* si no ha cargado las categorias muestra esto */}
      {isLoading && (
        <div>
          {/* <Spinner /> */}
          <h1>Cargando</h1>
        </div>
      )}
      <div className={styles.carusel}>
        {!isLoading &&
          // bucle para mostrar todas las categorias que vienen de la BD
          categories.map((category) => {
            return (
              // navLink
              // <CategoryItem
              //   className={styles.menu}
              //   key={category.id}
              //   category={category}
              // />

              // Para que funcione el outlet declaro cada categoria con una navLink y le muestro la ruta que tiene que hacer
              // cada vez que se aprete ( el to="")
              <NavLink
                to={"/category/" + category.title}
                className={styles.item}
                key={category._id}
              >
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
