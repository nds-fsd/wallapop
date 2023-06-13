import React, { useEffect, useState } from "react";
import styles from "./relatedProducts.module.css";
import {
  getAllProducts,
  getProductsByCategory,
} from "../../../utils/apiProducts";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

const RelatedProducts = ({ category, parentId }) => {
  const { data } = useQuery({
    queryKey: ["prods_related"],
    queryFn: getAllProducts,
  });

  const filteredProducts = data && data.filter(
    (prod) => prod.category === category && prod._id !== parentId
  );
  // const filteredProducts =
  //   data && data.filter((prod) => prod.category === category);

  console.log("los filtrados", filteredProducts);

  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 3;


  //pasa las cards una a una
  // const handleNext = () => {
  //   setCurrentIndex((currentIndex) =>
  //     currentIndex === filteredProducts.length - 1 ? 0 : currentIndex + 1
  //   );
  // };

  // const handlePrevious = () => {
  //   setCurrentIndex((currentIndex) =>
  //     currentIndex === 0 ? filteredProducts.length - 1 : currentIndex - 1
  //   );
  // };

  const handleNext = () => {
    setCurrentIndex((currentIndex) => (currentIndex + 3 >= filteredProducts.length ? 0 : currentIndex + 3));
  };
  
  const handlePrevious = () => {
    setCurrentIndex((currentIndex) => (currentIndex - 3 < 0 ? filteredProducts.length - 1 - ((filteredProducts.length - 1) % 3) : currentIndex - 3));
  };

  const displayedProducts =
    filteredProducts &&
    filteredProducts.slice(currentIndex, currentIndex + productsPerPage);

  return (
    <>
      <div className={styles.relatedProducts}>
        <h2>Productos relacionados</h2>
        <div className={styles.cardContainer}>
          <button
            onClick={handlePrevious}
            className={
              filteredProducts && filteredProducts.length <= 3
                ? `${styles.disabled}`
                : styles.active
            }
          >
            <span className="icon-undo2"></span>
          </button>

          {filteredProducts && filteredProducts.length > 0 ? (
            displayedProducts.map((data) => (
              <div>
                <Link
                  to={`/category/product/${data._id}`}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  key={data._id}
                >
                  <div className={styles.card}>
                    <img src={data.images[0]} alt={data.title} />
                    <h5 className={styles.title}>{data.title}</h5>
                    <p className={styles.description}>{data.description}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <h3>No hay productos relacionados</h3>
          )}
          <button
            onClick={handleNext}
            className={
              filteredProducts && filteredProducts.length <= 3
                ? `${styles.disabled}`
                : styles.active
            }
          >
            <span className="icon-redo2"></span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;
