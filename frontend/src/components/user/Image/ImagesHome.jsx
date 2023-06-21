import React, { useContext } from "react";
import styles from "./imagesHome.module.css";

const ImagesHome = ({ images, category, status }) => {
  const mockImages = [
    "https://picsum.photos/id/1/250/300",
    "https://picsum.photos/id/2/250/300",
    "https://picsum.photos/id/3/250/300",
  ];

  // console.log("en las imagenes", status)
  return (
    <>
      {/* {images >1 && (
      <div>
        {images[0]}
      </div>
    )} */}

      {images.length > 0 ? (
        <div className={styles.icon}>
          <img src={images[0]} className={styles.image}></img>
          <div className={styles.tags}>
            <p className={styles.status}>{status}</p>
            {category && category.map((cat) => <span className={cat.logo} />)}
          </div>
        </div>
      ) : (
        <div className={styles.noImage}>
          <p className={styles.statusNoImage}>{status}</p>
          <div className={styles.text}>
            <span className="icon-sad"></span>
            <p>Lo sentimos, no hay imágenes para mostrar</p>
          </div>

          {category && category.map((cat) => <span className={cat.logo} />)}
        </div>
      )}
    </>
  );
};

export default ImagesHome;
