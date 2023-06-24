import React, { useState } from "react";
import { useQuery } from "react-query";
import { getSoldByUser } from "../../../utils/apiProducts";
import Spinner from "../../Spinner/Spinner";
import styles from "./products.module.css";
import Images from "../Image/Images";
import ImagesList from "../Image/ImagesList";

const SalesCompleted = () => {
  const { data: prods, isLoading } = useQuery({
    queryKey: ["PRODUCTS_SOLD"],
    queryFn: getSoldByUser,
  });
  const [gridOpen, setGridOpen] = useState(true);
  const toggleView = () => {
    setGridOpen(!gridOpen);
  };

  return (
    <>
      {isLoading && (
        <div>
          <Spinner size="M" />
        </div>
      )}

      <div className={styles.gridList}>
        <button onClick={toggleView}>
          <span className="icon-table2"></span>
        </button>
        <button onClick={toggleView}>
          <span className="icon-list2"></span>
        </button>
      </div>
      <div>
        {gridOpen ? (
          <div className={styles.gridContainer} data-test="productos">
            {prods && prods.length > 0 ? (
              prods.map((prod) => (
                <div className={styles.card} data-test="producto">
                  {prods && (
                    <Images images={prod.images} status={prod.status} />
                  )}
                  <div className={styles.titleContainer}>
                    <h4 className={styles.title}>{prod.title}</h4>
                    <h4>
                      {prod.price.toLocaleString("es-ES", {
                        useGrouping: true,
                      })}
                      €
                    </h4>
                  </div>
                  <div className={styles.details}>
                    <div>
                      {prod.categories.map((category) => (
                        <h5 key={category._id}>{category.title}</h5>
                      ))}
                    </div>
                    <p>{prod.status}</p>
                  </div>
                  {Array.isArray(prod.keywords) && prod.keywords.length > 0 && (
                    <div className={styles.keywords}>
                      {prod.keywords.map((keyword, _id) => (
                        <p key={_id}>{`#${keyword}`}</p>
                      ))}
                    </div>
                  )}

                  <p className={styles.paragraph}>{prod.description}</p>
                </div>
              ))
            ) : (
              <div>Aún no has realizado ninguna venta</div>
            )}
          </div>
        ) : (
          <div className={styles.listContainer}>
            {prods && prods.length > 0 ? (
              prods.map((prod) => (
                <div className={styles.list} key={prod.id}>
                  <div className={styles.imgList}>
                    {prods && <ImagesList images={prod.images} />}
                  </div>
                  <div className={styles.detailsContainer}>
                    <div className={styles.titleContainer}>
                      <h4 className={styles.titleList}>{prod.title}</h4>
                      <h4>
                        {prod.price.toLocaleString("es-ES", {
                          useGrouping: true,
                        })}
                        €
                      </h4>
                    </div>
                    <p className={styles.paragraph}>{prod.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>Aún no has realizado ninguna venta</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SalesCompleted;
