import styles from "./listProducts.module.css";
import { api } from "../../../utils/apiProducts";
import { useQuery, useQueryClient } from "react-query";
import Product from "../product/Product";
import React, { useState } from "react";
import Paginator from "../Paginator/paginator";

const ListProducts = () => {
  const { data: products, isLoading } = useQuery("products", async () => {
    const res = await api.get("/products");
    return res.data;
  });

  return (
    <div className={styles.container}>
      {isLoading && <div>Cargando categorias</div>}
      <div className={styles.carusel}>
        <Paginator product={products} />
        {!isLoading &&
          products.map((prod) => {
            return (
              <>
                <Product className={styles.menu} key={prod.id} prod={prod} />
              </>
            );
          })}
      </div>
    </div>
  );
};

export default ListProducts;
