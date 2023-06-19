import React, { useContext } from "react";
import { useState } from "react";
import { getTransactionsByUser } from "../../../utils/apiTransacions";
import { useQuery } from "react-query";
import styles from "./products.module.css";
import stylesDark from "./productsDark.module.css";
import Spinner from "../../Spinner/Spinner";
import Images from "../Image/Images";
import { ThemeContext } from "../../../context/themeContext";

const PurchasesCompleted = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
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
      <div className={darkMode ? stylesDark.gridList : styles.gridList}>
        <button onClick={toggleView}>
          <span className="icon-table2"></span>
        </button>
        <button onClick={toggleView}>
          <span className="icon-list2"></span>
        </button>
      </div>
      <div>
        {gridOpen ? (
          <div
            className={
              darkMode ? stylesDark.gridContainer : styles.gridContainer
            }
            data-test="productos"
          >
            {transactions &&
              transactions.map((transaction) => (
                <div
                  className={darkMode ? stylesDark.card : styles.card}
                  data-test="producto"
                >
                  {transaction.product.map((prod) => (
                    <Images images={prod.images} status={prod.images} />
                  ))}
                  {transaction.product.map((prod) => (
                    <div
                      className={
                        darkMode
                          ? stylesDark.titleContainer
                          : styles.titleContainer
                      }
                    >
                      <h4
                        className={darkMode ? stylesDark.title : styles.title}
                      >
                        {prod.title}
                      </h4>
                      <h4>
                        {prod.price.toLocaleString("es-ES", {
                          useGrouping: true,
                        })}
                        €
                      </h4>
                    </div>
                  ))}
                  {transaction.vendor.map((ven) => (
                    <div
                      className={darkMode ? stylesDark.details : styles.details}
                    >
                      <p key={ven._id}> Vendedor: {ven.name}</p>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        ) : (
          <div
            className={
              darkMode ? stylesDark.listContainer : styles.listContainer
            }
          >
            {transactions &&
              transactions.map((transaction) => (
                <div
                  className={darkMode ? stylesDark.card : styles.card}
                  data-test="producto"
                >
                  {/* Hacemos map de los datos del producto para mostrar la imagen */}
                  {transaction.product.map((prod) => (
                    <Images images={prod.images} status={prod.images} />
                  ))}
                  {/* Hacemos map de los datos del producto */}
                  {transaction.product.map((prod) => (
                    <div
                      className={
                        darkMode
                          ? stylesDark.titleContainer
                          : styles.titleContainer
                      }
                    >
                      <h4
                        className={darkMode ? stylesDark.title : styles.title}
                      >
                        {prod.title}
                      </h4>
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
                    <div
                      className={darkMode ? stylesDark.details : styles.details}
                    >
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
