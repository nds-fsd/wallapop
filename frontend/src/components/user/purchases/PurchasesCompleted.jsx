import React, { useContext } from "react";
import { useState } from "react";
import { getTransactionsByUser } from "../../../utils/apiTransacions";
import { useQuery } from "react-query";
import styles from "./products.module.css";
import Spinner from "../../Spinner/Spinner";
import Images from "../Image/Images";
import ImagesList from "../Image/ImagesList";

const PurchasesCompleted = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["PURCHASES_COMPLETED"],
    queryFn: getTransactionsByUser,
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
            {transactions && transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div className={styles.card} data-test="producto">
                  {transaction.product.map((prod) => (
                    <Images images={prod.images} status={prod.images} />
                  ))}
                  {transaction.product.map((prod) => (
                    <div className={styles.titleContainer}>
                      <h4 className={styles.title}>{prod.title}</h4>
                      <h4>
                        {prod.price.toLocaleString("es-ES", {
                          useGrouping: true,
                        })}
                        €
                      </h4>
                    </div>
                  ))}
                  {transaction.vendor.map((ven) => (
                    <div className={styles.details}>
                      <p key={ven._id}> Vendedor: {ven.name}</p>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className={styles.sinProducts}>
                <h3>Aún no has realizado ninguna compra</h3>
                <h5>Empieza a vender para ganar dinero 🛒</h5>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.listContainer}>
            {transactions && transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div
                  className={styles.list}
                  key={transaction._id}
                  data-test="producto"
                >
                  {/* Hacemos map de los datos del producto para mostrar la imagen */}
                  {transaction.product.map((prod) => (
                    // <Images images={prod.images} status={prod.images} />
                    <div className={styles.imgList}>
                      {prod && <ImagesList images={prod.images} />}
                    </div>
                  ))}
                  {/* Hacemos map de los datos del producto */}
                  <div className={styles.detailsContainer}>
                    {transaction.product.map((prod) => (
                      <div className={styles.titleContainer}>
                        <h4 className={styles.titleList}>{prod.title}</h4>
                        <h4 className={styles.price}>
                          {prod.price.toLocaleString("es-ES", {
                            useGrouping: true,
                          })}
                          €
                        </h4>
                      </div>
                    ))}
                    {/* Hacemos map de los datos del vendedor */}
                    {transaction.vendor.map((ven) => (
                      <div className={styles.details}>
                        <p key={ven._id}> Vendedor: {ven.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.sinProducts}>
                <h3>Aún no has realizado ninguna compra</h3>
                <h5>Empieza a vender para ganar dinero 🛒</h5>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PurchasesCompleted;
