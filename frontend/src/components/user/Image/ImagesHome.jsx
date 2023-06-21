import React, { useContext } from "react";
import styles from "./imagesHome.module.css";

const ImagesHome = ({ images, category, status }) => {

  return (
    <>
      {images.length > 0 ? (
        <div className={styles.icon}>
          <img src={images[0]} className={styles.image}></img>
          <div className={styles.tags}>
            <p className={styles.status}>{status}</p>
            {category &&
              category.map((cat) => (
                <span className={cat.logo} key={cat._id} />
              ))}
          </div>
        </div>
      ) : (
        <div className={styles.noImage}>
          <p className={styles.statusNoImage}>{status}</p>
          <div className={styles.text}>
            <span className="icon-sad"></span>
            <p>Lo sentimos, no hay imágenes para mostrar</p>
          </div>

          {category && category.map((cat)=> <span className={cat.logo} key={cat._id}/>)}
        </div>
      )}
    </>
  );
};

export default ImagesHome;
