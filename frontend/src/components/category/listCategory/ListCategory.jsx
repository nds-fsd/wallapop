import React from "react";
import CategoryItem from "../categoryItem/CategoryItem";
import styles from "./listCategory.module.css";
import { api } from "../../../utils/apiProducts";
import { useQuery } from "react-query";

const ListCategory = () => {
  const { data: categories, isLoading } = useQuery("categories", async () => {
    const res = await api.get("/category");
    return res.data;
  });

  //peticion ultimos productos creados
  //   //creas funcion handleNavigate(names) //navigare ('ruta)
  // buton onclick handlenavigate() => hadler(categori.name)

  return (
    <div className={styles.container}>
      {isLoading && <div>Cargando categorias</div>}
      <div className={styles.carusel}>
        {!isLoading &&
          categories.map((category) => {
            return (
              // navLink
              <CategoryItem
                className={styles.menu}
                key={category.id}
                category={category}
              />
            );
          })}
      </div>
      {/* outlet --> lista productos */}
    </div>
  );
};

export default ListCategory;
