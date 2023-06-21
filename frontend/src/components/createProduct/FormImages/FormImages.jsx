import React, { useContext, useEffect } from "react";
import styles from "./formImages.module.css";
import { AuthContext } from "../../../context/authContext";

const FormImages = ({ handleImageUpload, reset }) => {
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
        <h2 className={styles.title}>Imágenes</h2>
        <div className={styles.line}></div>
        <h5 className={styles.tip}>
          <span className={styles.boldChar}>
            Aquí va un consejo... Sube al menos 3 fotos de calidad.
          </span>
          Ya conoces el refrán, una imagen vale más que mil palabras.
        </h5>
      </div>

      <div className={styles.images}>
        {images.map((preview, index) => (
          <div key={index} className={styles.imagePreview}>
            <img src={preview} />
          </div>
        ))}

        {Array.from({ length: remainingSlots }).map((_, index) => (
          <div key={index + images.length} className={styles.imagePreview}>
            <button onClick={handleOpenWidget} className={styles.image}>
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
