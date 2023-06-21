import React, { useContext } from "react";
import { useState } from "react";
import { getTransactionsByUser } from "../../../utils/apiTransacions";
import { useQuery } from "react-query";
import styles from "./products.module.css";
import Spinner from "../../Spinner/Spinner";
import Images from "../Image/Images";

const PurchasesCompleted = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["PURCHASES_COMPLETED"],
    queryFn: getTransactionsByUser,
  });
  // console.log("los productos", transactions);
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
            {transactions &&
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
              ))}
          </div>
        ) : (
          <div className={styles.listContainer}>
            {transactions &&
              transactions.map((transaction) => (
                <div className={styles.card} data-test="producto">
                  {/* Hacemos map de los datos del producto para mostrar la imagen */}
                  {transaction.product.map((prod) => (
                    <Images images={prod.images} status={prod.images} />
                  ))}
                  {/* Hacemos map de los datos del producto */}
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
                  {/* Hacemos map de los datos del vendedor */}
                  {transaction.vendor.map((ven) => (
                    <div className={styles.details}>
                      <p key={ven._id}> Vendedor: {ven.name}</p>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PurchasesCompleted;
