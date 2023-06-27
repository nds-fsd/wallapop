import React, { useState, useContext } from "react";
import styles from "./modalContentSlider.module.css";

const ModalContentSlider = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const amount = images.length;
  const nextImage = () => {
    setCurrentImage(currentImage === amount - 1 ? 0 : currentImage + 1);
  };
  const prevImage = () => {
    setCurrentImage(currentImage === 0 ? 1 : currentImage - 1);
  };
  return (
    <>
      <div className={styles.container}>
        {amount > 1 && (
          <button onClick={prevImage} className={styles.button}>
            <span className="icon-undo2"></span>
          </button>
        )}

        {images.map((image, id) => (
          <div
          key={id}
            className={
              currentImage === id
                ? `${styles.slide} ${styles.active}`
                : styles.slide
            }
          >
            {currentImage === id && (
              <img
                key={id}
                src={image}
                alt={image}
                className={styles.imgSlider}
              />
            )}
          </div>
        ))}
        {amount > 1 && (
          <button onClick={nextImage} className={styles.button}>
            <span className="icon-redo2"></span>
          </button>
        )}
      </div>
      <div className={styles.miniImgContainer}>
        {images.map((image, id) => (
          <img
            key={id}
            src={image}
            className={
              currentImage === id
                ? `${styles.miniImg} ${styles.miniImgactive}`
                : styles.miniImg
            }
          ></img>
        ))}
      </div>
    </>
  );
};

export default ModalContentSlider;
