import React, { useContext } from "react";
import styles from "./images.module.css";
import stylesDark from "./imagesDark.module.css";
import { ThemeContext } from "../../../context/themeContext";

const Images = ({ images }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

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

      {images.length > 0 ? (
        <div
          className={
            darkMode ? stylesDark.imagesContainer : styles.imagesContainer
          }
        >
          <img
            src={images[0]}
            className={darkMode ? stylesDark.image : styles.image}
          ></img>
        </div>
      ) : (
        <div className={darkMode ? stylesDark.noImage : styles.noImage}>
          <span className="icon-sad"></span>
          <p>Lo sentimos, no hay imágenes para mostrar</p>
        </div>
      )}
    </>
  );
};

export default Images;
