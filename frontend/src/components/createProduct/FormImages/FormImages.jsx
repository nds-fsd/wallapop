import React, { useContext, useState, useRef, useEffect } from "react";
import styles from "./formImages.module.css";
import { AuthContext } from "../../../context/authContext";

const FormImages = ({ handleImageUpload, imagePreviews }) => {
  const { multipleUploadWidget, images, setImages } = useContext(AuthContext);

  const handleOpenWidget = (event) => {
    event.preventDefault();
    multipleUploadWidget.open();
  };

  const handleFileChange = (event, index) => {
    const files = event.target.files;
    handleImageUpload(files, index);
    const uploadedImage= imagePreviews[index]
    setImages(uploadedImage)
  };

  

  return (
    <>
      <div>
        <h2>Imágenes</h2>
        <div className={styles.line}></div>
        <h5 className={styles.tip}>
          <span className={styles.boldChar}>
            Aquí va un consejo... Sube al menos 3 fotos de calidad.
          </span>
          Ya conoces el refrán, una imagen vale más que mil palabras.
        </h5>
      </div>

      <div className={styles.images}>
        {imagePreviews.map((preview, index) => (
          <div key={index} className={styles.imagePreview}>
            <img src={preview} alt={`Preview ${index}`} />
          </div>
        ))}

        {Array.from({ length: Math.max(6 - imagePreviews.length, 1) }).map((_, index) => (
          <div key={index + imagePreviews.length} className={styles.imagePreview}>
            {index === 0 && images ? (
            <img src={images} alt="Uploaded Image" />
          ) : (
            <button onClick={handleOpenWidget} className={styles.image}>
              <span className="icon-image1"></span>
            </button>
          )}
        </div>
      ))}

      <input
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      </div>
                 

      {/* <div className={styles.images}>
        <button onClick={handleOpenWidget} className={styles.image}>
          <span className="icon-image1"></span>
        </button>
        <button onClick={handleOpenWidget} className={styles.image}>
          <span className="icon-image1"></span>
        </button>
        <button onClick={handleOpenWidget} className={styles.image}>
          <span className="icon-image1"></span>
        </button>
        <button onClick={handleOpenWidget} className={styles.image}>
          <span className="icon-image1"></span>
        </button>
        <button onClick={handleOpenWidget} className={styles.image}>
          <span className="icon-image1"></span>
        </button>
        <button onClick={handleOpenWidget}className={styles.image}>
          <span className="icon-image1"></span>
        </button>
      </div> */}
      {/* <div>
      <input type='submit' value='Subir' className={styles.button}></input>
    </div> */}
    </>
  );
};

export default FormImages;
