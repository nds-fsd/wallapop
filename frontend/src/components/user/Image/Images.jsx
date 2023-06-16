import React from "react";
import styles from "./images.module.css";

const Images = ({ images }) => {

  return (
    <>
      {images?.length > 0 ? (
        <div className={styles.imagesContainer}>
          <img src={images[0]} className={styles.image}></img>
        </div>
      ) : (
        <div className={styles.noImage}>
          <span className="icon-sad"></span>
          <p>Lo sentimos, no hay imágenes para mostrar</p>
        </div>
      )}
    </>
  );
};

export default Images;
