import React from "react";
import styles from "./images.module.css";

const ImagesList = ({ images, status }) => {
  const mockImages = [
    "https://picsum.photos/id/1/350/150",
    "https://picsum.photos/id/2/350/150",
    "https://picsum.photos/id/3/350/150",
  ];

  return (
    <>
      {/* {images >1 && (
      <div>
        {images[0]}
      </div>
    )} */}

      {/* <img src={images[0]} className={styles.imgList}></img>
    <p>{status}</p>
   
    {images === 0 && (
      <div className={styles.noImageList}>
        <span className="icon-sad"></span>
    </div>
    )} */}

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
