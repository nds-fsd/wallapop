import React from "react";
import styles from "./productBar.module.css";

const ProductBar = ({ data }) => {
  return (
    <>
      <div className={styles.productBar}>
        <div className={styles.productDetails}>
          <div>
            <p>{data.title}</p>
            <h3>{data?.price?.toLocaleString('es-ES', {useGrouping: true})} €</h3>
          </div>
          <button className={styles.comprar}>COMPRAR</button>
        </div>
      </div>
    </>
  );
};

export default ProductBar;
