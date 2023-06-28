import React from "react";
import { useQuery } from "react-query";
import { getSoldByUser } from "../../../utils/apiProducts";
import { getTransactionsByUser } from "../../../utils/apiTransacions";
import Spinner from "../../Spinner/Spinner";
import styles from "./stats.module.css";

const StatsSales = () => {
  const { data: sales, isLoading } = useQuery({
    queryKey: ["PRODUCTS_SOLD"],
    queryFn: getSoldByUser,
  });

  const totalSales = sales ? sales.length : 0;
  const totalAmount = sales
    ? sales.reduce((total, sale) => total + sale.price, 0)
    : 0;
  const averagePerSale = totalSales > 0 ? totalAmount / totalSales : 0;

  return (
    <>
      {isLoading && (
        <div>
          <Spinner size="M" />
        </div>
      )}

      {sales && sales.length > 0 ? (
        <div className={styles.gridContainerSales}>
          <div className={styles.titleSales}>
            <h2>Producto</h2>
            <h2>Precio</h2>
          </div>
          <div className={styles.gridSales}>
            {sales.map((sale) => (
              <div className={styles.rowSales} key={sale._id}>
                <div className={styles.columnSales}>
                  <h4>{sale.title}</h4>
                </div>
                <div className={styles.columnSales}>
                  <h4>
                    {sale.price.toLocaleString("es-ES", {
                      useGrouping: true,
                    })}{" "}
                    €
                  </h4>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.priceContainer}>
            <div className={styles.price}>
              <h3>Importe total de las ventas realizadas:</h3>
              <h3>
                {totalAmount.toLocaleString("es-ES", {
                  useGrouping: true,
                })}
                €
              </h3>
            </div>
            <div className={styles.price2}>
              <h3>Número total de ventas:</h3>
              <h3>{totalSales}</h3>
            </div>
            <div className={styles.price2}>
              <h3>Promedio por venta:</h3>
              <h3>
                {averagePerSale.toLocaleString("es-ES", {
                  useGrouping: true,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                €
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.sinProducts}>
          <h3>Aún no has realizado ninguna compra</h3>
          <h5>Empieza a vender para ganar dinero 🛒</h5>
        </div>
      )}
    </>
  );
};

export default StatsSales;
