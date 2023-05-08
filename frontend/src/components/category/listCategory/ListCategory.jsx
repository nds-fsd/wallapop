import React from "react";
import CategoryItem from "../categoryItem/CategoryItem";
import styles from "./listCategory.module.css";
<<<<<<< HEAD
import { apiCategory } from "../../../utils/apiCategories";
// import { apiProduct } from "../../../utils/apiProducts";
=======
import { api } from "../../../utils/apiProducts";
>>>>>>> 48d9578b2b9d9667c2f8014752b0f17873e3fb69
import { useQuery } from "react-query";
import { NavLink, Navigate, Outlet, useParams } from "react-router-dom";

const ListCategory = () => {
  // Hago peticion a BD para obtener todas las categorias
  const { data: categories, isLoading } = useQuery("categories", async () => {
    const res = await apiCategory.get("/category");
    return res.data;
  });

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
