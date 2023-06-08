import styles from "./listProducts.module.css";
import { useQuery } from "react-query";
import Product from "../product/Product";
import React from "react";
import { useParams } from "react-router-dom";
import { getProductByCategory } from "../../../utils/apiProducts";
import Spinner from "../../Spinner/Spinner";

const ListProducts = () => {
  const params = useParams();
  //llamo a la funcion getProductByCategory para poder mostrar la lista de productos
  const { data: products, isLoading } = useQuery(
    ["category", params.category],
    getProductByCategory
  );

  return (
    <div className={styles.container}>
      <h1>{params.category}</h1>
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}
      <div className={styles.carusel}>
        {!isLoading &&
          // hago bucle para mostrar todos los productos que me ha llegado de la BD
          products.map((prod) => {
            return (
              // Llamo al componente PRoduct y le paso la info de cada producto
              <Product
                data-test="product"
                className={styles.menu}
                key={prod.id}
                prod={prod}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ListProducts;
