import React from "react";
import styles from "./product.module.css";
import { NavLink } from "react-router-dom";

const Product = ({ prod }) => {
  console.log("los productos", prod)
    // creo los datos que recibo(prod) que vamos a mostrar en cada card de producto

  const images = prod.images
  console.log(images)
  
  return (
    <>
      <NavLink to={"/category/product/" + prod._id} data-test="product" className={styles.container}>
        <div className={styles.card}>
          {images.length > 0 ? (
            <div className={styles.columnLeft}>
              <img src={images[0]}/>
            </div>
          ) : (
            <div className={styles.noImage}>
              <div className={styles.text}>
                <span className="icon-sad" />
                <p>Lo sentimos, no hay imágenes para mostrar</p>
              </div>
            </div>
          )}
          <div className={styles.columnRight}>
            <h4>{prod.price.toLocaleString("es-ES", { useGrouping: true })} €</h4>
            <h6>{prod.title}</h6>
            <p>{prod.description}</p>
          </div>
        </div>
      </NavLink>
    </>
    
  );
};

export default Product;
