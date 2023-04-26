import React from "react";
import CategoryItem from "../categoryItem/index";
import styles from "./styles.module.css";
import { api } from "../../../utils/api";
import { useQuery, useQueryClient } from "react-query";

const ListCategory = () => {
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery("categories", async () => {
    const res = await api.get("/category");
    return res.data;
  });

  return (
    <div className={styles.container}>
      {isLoading && <div>Cargando categorias</div>}
      <div className={styles.carusel}>
        {!isLoading &&
          categories.map((category) => {
            return (
              <CategoryItem
                className={styles.menu}
                key={category.id}
                category={category}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ListCategory;
