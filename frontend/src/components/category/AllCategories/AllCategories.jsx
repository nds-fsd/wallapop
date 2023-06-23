import React, { useState, useContext } from "react";
import styles from "./allCategories.module.css";
import { useQuery } from "react-query";
import { getTwelveProducts } from "../../../utils/apiProducts";
import { Link } from "react-router-dom";
import ImagesHome from "../../user/Image/ImagesHome";

const AllCategories = () => {
  const { data: prods } = useQuery({
    queryKey: ["products"],
    queryFn: getTwelveProducts,
  });
  const [visibleProductsCount, setVisibleProductsCount] = useState(12)
  const loadMoreProducts = () => {
    setVisibleProductsCount((prevCount) => prevCount + 12 )
  }

  const showLessProducts = () => {
    setVisibleProductsCount((prevCount) => prevCount - 12);
  };
  const visibleProducts = prods?.slice(0, visibleProductsCount);

  // const [showAll, setShowAll] = useState(false);
  // const visibleProductsCount = showAll ? prods.length : 18;
  // const toggleShowAll = () => {
  //   setShowAll(!showAll);
  // };


  return (
    <>
      <div className={styles.gridContainer}>
        {visibleProducts?.map((prod) => (
          <Link
            data-test="card_prod"
            to={`/category/product/${prod._id}`}
            target="_blank"
            style={{ textDecoration: 'none' }}
            className={styles.linkLink}

          >
            <div key={prod._id} className={styles.card}>
              {prods && (
                <ImagesHome
                  images={prod.images}
                  className={styles.images}
                  category={prod.categories}
                  status={prod.status}
                />
              )}
              <div className={styles.titleContainer}>
                <div className={styles.priceContainer}>
                  <h5>
                    {prod.price.toLocaleString("es-ES", {
                      useGrouping: true,
                    })}
                    €
                  </h5>
                </div>
                <p className={styles.title}>{prod.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>


      {prods && prods.length > 12 && visibleProductsCount < prods.length && (
        <button onClick={loadMoreProducts} className={styles.view}>
          Mostrar más
        </button>
      )}
      {visibleProductsCount > 12 && (
        <button onClick={showLessProducts} className={styles.view}>
          Mostrar menos
        </button>
      )}
      
      {/* {prods && prods.length > 20 && (
        <button onClick={toggleShowAll} className={styles.view}>
          {showAll ? "Mostrar menos" : "Mostrar más"}
        </button>
      )} */}
    </>
  );
};

export default AllCategories;
