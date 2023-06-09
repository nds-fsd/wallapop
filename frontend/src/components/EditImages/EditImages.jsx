import React from "react";
import styles from "./editImages.module.css";

const EditImages = ({ product }) => {
  console.log("el producto a editar", product);

  const images = product && product.images;
  console.log("las imagenes a editar", images);
  return (
    <>
      <div className={styles.double}>
        <label htmlFor="images" className={styles.labels}>
          Imágenes:
        </label>
        <div className={styles.images}>
          {images && images.length > 0 ? (
            images.map((image, _id) => (
              <img key={image._id} className={styles.image} src={image}></img>
            ))
          ) : (
            <div className={styles.noImage}>
              <p>No has subido imágenes</p>
              {/* <div className={styles.imagePreview}>
                <button className={styles.push}>
                  <span className="icon-image1"></span>
                </button>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditImages;
