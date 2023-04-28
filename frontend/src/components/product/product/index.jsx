import React from "react";
import styles from "./styles.module.css";

const Product = ({ prod }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.columnLeft}>
          <img src={prod.photo}></img>
        </div>
        <div className={styles.columnRight}>
          <h4>{prod.price}</h4>
          <h6>{prod.title}</h6>
          <h2>{prod.description}</h2>
        </div>
      </div>
    </div>
  );
};

export default Product;
