import styles from "./listProducts.module.css";
import { useQuery } from "react-query";
import Product from "../product/Product";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByCategory } from "../../../utils/apiProducts";
import Spinner from "../../Spinner/Spinner";
import AllCategories from "../../category/AllCategories/AllCategories";

const ListProducts = () => {
  const params = useParams();
  //llamo a la funcion getProductByCategory para poder mostrar la lista de productos
  const { data: products, isLoading } = useQuery(
    ["category", params.category],
    getProductByCategory
  );

  const isAllProductsCategory = params.category === "Todas las Categorías";
  const filteredProducts = isAllProductsCategory
    ? products
    : products && products.filter((prod) => prod.category === params.category);

  const [visibleProductsCount, setVisibleProductsCount] = useState(5);
  const loadMoreProducts = () => {
    setVisibleProductsCount((prevCount) => prevCount + 5);
  };

  const showLessProducts = () => {
    setVisibleProductsCount((prevCount) => prevCount - 5);
  };

  return (
    <div>
      <h1 className={styles.title}>{params.category}</h1>
      {isLoading && (
        <div>
          <Spinner size="M" />
        </div>
      )}
      {!isLoading &&
        filteredProducts.length === 0 &&
        !isAllProductsCategory && (
          <div className={styles.noProducts}>
            <h3>No hay productos para mostrar</h3>
          </div>
        )}
      {isAllProductsCategory ? (
        <AllCategories />
      ) : (
        <div className={styles.carusel}>
          {!isLoading &&
            // hago bucle para mostrar todos los productos que me ha llegado de la BD
            filteredProducts
              .slice(0, visibleProductsCount)
              .map((prod, index) => {
                if (!prod.sold) {
                  const isLastCard = index === filteredProducts.length - 1;
                  return (
                    // Llamo al componente PRoduct y le paso la info de cada producto
                    <div
                      data-test="product"
                      className={`${styles.menu} ${
                        isLastCard ? styles.lastCard : ""
                      }`}
                      key={prod._id}
                    >
                      <Product data-test="product" key={prod._id} prod={prod} />
                    </div>
                  );
                }
              })}
          {filteredProducts && filteredProducts.length > visibleProductsCount && (
            <button onClick={loadMoreProducts} className={styles.view}>
              Mostrar más
            </button>
          )}
          {visibleProductsCount > 5 && (
            <button onClick={showLessProducts} className={styles.view}>
              Mostrar menos
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ListProducts;
