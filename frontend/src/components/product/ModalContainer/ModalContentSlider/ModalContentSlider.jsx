import React, { useState, useContext } from "react";
import styles from "./modalContentSlider.module.css";
import stylesDark from "./modalContentSliderDark.module.css";
import ThemeContext from "../../../../context/themeContext";

const ModalContentSlider = ({ images }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
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
      <div className={darkMode ? stylesDark.container : styles.container}>
        <button
          onClick={prevImage}
          className={darkMode ? stylesDark.button : styles.button}
        >
          <span className="icon-undo2"></span>
        </button>
        {images.map((image, id) => (
          <div
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
                className={darkMode ? stylesDark.imgSlider : styles.imgSlider}
              />
            )}
          </div>
        ))}
        <button
          onClick={nextImage}
          className={darkMode ? stylesDark.button : styles.button}
        >
          <span className="icon-redo2"></span>
        </button>
      </div>
      <div
        className={
          darkMode ? stylesDark.miniImgContainer : styles.miniImgContainer
        }
      >
        {images.map((image, id) => (
          <img
            key={image.id}
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
