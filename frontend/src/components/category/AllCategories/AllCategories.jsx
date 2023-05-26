import React, { useState } from "react";
import styles from "./allCategories.module.css";
import { useQuery } from "react-query";
import { getAllProducts } from "../../../utils/apiProducts";
import ImagesHome from "../../user/products/Image/ImagesHome";
import { Link } from "react-router-dom";

const AllCategories = () => {
  const { data: prods } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const [showAll, setShowAll] = useState(false)
  const visibleProductsCount = showAll ? prods.length : 20
  const visibleProducts = prods?.slice(0, visibleProductsCount)
  const toggleShowAll = () => {
    setShowAll(!showAll);

  };

  console.log(prods)


  return (
    <>
      <h1 className={styles.genTitle}>Los productos más destacados</h1>

      <div className={styles.gridContainer}>
        {visibleProducts?.map((prod) => (
          <Link to={`/category/product/${prod._id}`} target="_blank" className={styles.link}>
            <div className={styles.card}>
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
                    })}{" "}
                    €
                  </h5>
                  <span className="icon-heart1"></span>
                </div>
                <p className={styles.title}>{prod.title}</p>
              </div>
            </div>
            </Link>
          ))}
      </div>
      {prods && prods.length > 20 && (
        <button onClick={toggleShowAll} className={styles.view}>
          {showAll ? "Mostrar menos" : "Mostrar más"}
        </button>
      )}
    </>
  );
};

export default AllCategories;
