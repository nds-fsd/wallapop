import React from "react";
import styles from "./images.module.css";

const ImagesList = ({ images }) => {
  return (
    <>
      {images.length > 0 ? (
        <img src={images[0]} className={styles.imgList}></img>
      ) : (
        <div className={styles.noImageList}>
          <span className="icon-eye-blocked"></span>
          <p>Imágenes</p>
        </div>
      )}
    </>
  );
};

export default ImagesList;
