import React from "react";
import { useQuery } from "react-query";
import { getTransactionsByUser } from "../../../utils/apiTransacions";
import Spinner from "../../Spinner/Spinner";
import styles from "./stats.module.css";

const StatsPurchases = () => {
  const { data: purchases, isLoading } = useQuery({
    queryKey: ["PURCHASES_COMPLETED"],
    queryFn: getTransactionsByUser,
  });

  const totalPurchases = purchases ? purchases.length : 0;
  const totalAmount = purchases
    ? purchases.reduce(
        (total, purchase) =>
          total +
          purchase.product.reduce((subtotal, prod) => subtotal + prod.price, 0),
        0
      )
    : 0;
  const averagePerPurchase =
    totalPurchases > 0 ? totalAmount / totalPurchases : 0;

  // console.log("las compras", purchases);
  return (
    <>
      {isLoading && (
        <div>
          <Spinner size="M" />
        </div>
      )}
      <div className={styles.gridContainer}>
        <div className={styles.title}>
          <h2>Producto</h2>
          <h2>Precio</h2>
          <h2>Comprador</h2>
        </div>
        {purchases && purchases.length > 0 ? (
          <div className={styles.grid}>
            {purchases.map((purch) => (
              <div className={styles.row} key={purch._id}>
                <div className={styles.column}>
                  {purch.product.map((prod) => (
                    <h4 key={prod._id}>{prod.title}</h4>
                  ))}
                </div>
                <div className={styles.column}>
                  {purch.product.map((prod) => (
                    <h4 key={prod._id}>
                      {prod.price.toLocaleString("es-ES", {
                        useGrouping: true,
                      })}{" "}
                      €
                    </h4>
                  ))}
                </div>
                <div className={styles.column}>
                  {purch.purchaser.map((purcha) => (
                    <h4 key={purcha._id}>{purcha.name}</h4>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Sin compras</div>
        )}
        <div className={styles.priceContainer}>
          <div className={styles.price}>
            <h3>Importe total de las compras realizadas</h3>
            <h3>
              {totalAmount.toLocaleString("es-ES", {
                useGrouping: true,
              })}
              €
            </h3>
          </div>
          <div className={styles.price2}>
            <h3>Número total de compras:</h3>
            <h3>{totalPurchases}</h3>
          </div>
          <div className={styles.price2}>
            <h3>Promedio por compra:</h3>
            <h3>
              {averagePerPurchase.toLocaleString("es-ES", {
                useGrouping: true,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              €
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsPurchases;
