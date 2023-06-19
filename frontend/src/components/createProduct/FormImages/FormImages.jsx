import React, { useContext, useEffect } from "react";
import styles from "./formImages.module.css";
import stylesDark from "./formImagesDark.module.css";
import { AuthContext } from "../../../context/authContext";
import { ThemeContext } from "../../../context/themeContext";

const FormImages = ({ handleImageUpload, reset }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { multipleUploadWidget, images, setImages } = useContext(AuthContext);

  const handleOpenWidget = (event) => {
    event.preventDefault();
    multipleUploadWidget.open();
  };

  const handleFileChange = (event, index) => {
    const files = event.target.files;
    handleImageUpload(files, index);
    const uploadedImage = images[index];
    setImages([...images, uploadedImage]);
  };
  console.log("Nuevas imagenes", images);

  const remainingSlots = Math.max(6 - images.length, 0);
  const resetImages = () => {
    setImages([]);
  };
  useEffect(() => {
    resetImages();
  }, [reset]);

  return (
    <>
      <div>
        <h2 className={darkMode ? stylesDark.title : styles.title}>Imágenes</h2>
        <div className={darkMode ? stylesDark.line : styles.line}></div>
        <h5 className={darkMode ? stylesDark.tip : styles.tip}>
          <span className={darkMode ? stylesDark.boldChar : styles.boldChar}>
            Aquí va un consejo... Sube al menos 3 fotos de calidad.
          </span>
          Ya conoces el refrán, una imagen vale más que mil palabras.
        </h5>
      </div>

      <div className={darkMode ? stylesDark.images : styles.images}>
        {images.map((preview, index) => (
          <div
            key={index}
            className={darkMode ? stylesDark.imagePreview : styles.imagePreview}
          >
            <img src={preview} />
          </div>
        ))}

        {Array.from({ length: remainingSlots }).map((_, index) => (
          <div
            key={index + images.length}
            className={darkMode ? stylesDark.imagePreview : styles.imagePreview}
          >
            <button
              onClick={handleOpenWidget}
              className={darkMode ? stylesDark.image : styles.image}
            >
              <span className="icon-image1"></span>
            </button>
          </div>
        ))}

        <input
          type="file"
          accept="image/*"
          multiple="multiple"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </>
  );
};

export default FormImages;
