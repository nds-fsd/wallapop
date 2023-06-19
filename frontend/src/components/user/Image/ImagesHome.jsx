import React, { useContext } from "react";
import styles from "./imagesHome.module.css";
import stylesDark from "./imagesHomeDark.module.css";
import { ThemeContext } from "../../../context/themeContext";

const ImagesHome = ({ images, category, status }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

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
        <div className={darkMode ? stylesDark.icon : styles.icon}>
          <img
            src={images[0]}
            className={darkMode ? stylesDark.image : styles.image}
          ></img>
          <div className={darkMode ? stylesDark.tags : styles.tags}>
            <p className={darkMode ? stylesDark.status : styles.status}>
              {status}
            </p>
            {category && category.map((cat) => <span className={cat.logo} />)}
          </div>
        </div>
      ) : (
        <div className={darkMode ? stylesDark.noImage : styles.noImage}>
          <p
            className={
              darkMode ? stylesDark.statusNoImage : styles.statusNoImage
            }
          >
            {status}
          </p>
          <div className={darkMode ? stylesDark.text : styles.text}>
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
