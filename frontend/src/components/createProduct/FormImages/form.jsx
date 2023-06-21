import React, { useContext, useState, useRef, useEffect } from "react";
import styles from "./formImages.module.css";
import { AuthContext } from "../../../context/authContext";

const FormImages = ({ handleImageUpload, imagePreviews }) => {
  const { multipleUploadWidget, image } = useContext(AuthContext);

  const handleOpenWidget = (event) => {
    event.preventDefault();
    multipleUploadWidget.open();
  };

  const handleFileChange = (event, index) => {
    const files = event.target.files;
    handleImageUpload(files, index);
  };

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
        {imagePreviews.map((preview, index) => (
          <div key={index} className={styles.imagePreview}>
            {index === 0 && images ? (
              <img src={images} alt="Uploaded" />
            ) : (
              <img src={preview} alt={`Preview ${index}`} />
            )}
          </div>
        ))}

        {Array.from({ length: Math.max(6 - imagePreviews.length, 1) }).map(
          (_, index) => (
            <div
              key={index + imagePreviews.length}
              className={styles.imagePreview}
            >
              {index >= imagePreviews.length && (
                <button onClick={handleOpenWidget} className={styles.image}>
                  <span className="icon-image1"></span>
                </button>
              )}
            </div>
          )
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={(event) => handleFileChange(event, imagePreviews.length)}
      />

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

//MULTIPLE CARGA DE IMAGENES EN LOS PRODUCTOS
//  const [images, setImages] = useState([]);

//  const handleUploadSuccess = (result) => {
//    if (!result || result.event !== "success") {
//      return;
//    }
//    const imageUrl = result.info.secure_url;
//    setImages((prevImages) => [...prevImages, imageUrl]);
//  };

//  const multipleUploadWidget = cloudinary.createUploadWidget({
//    cloudName: "dvogntdp2",
//    uploadPreset: "kysnseyx",
//    sources: ["local", "url", "image_search", "google_drive"],
//    googleApiKey: "<image_search_google_api_key>",
//    showAdvancedOptions: true,
//    cropping: true,
//    multiple: true,
//    defaultSource: "local",
//    styles: {
//      palette: {
//        window: "#FFFFFF",
//        windowBorder: "#90A0B3",
//        tabIcon: "#EBA905",
//        menuIcons: "#5A616A",
//        textDark: "#000000",
//        textLight: "#FFFFFF",
//        link: "#EBA905",
//        action: "#39428D",
//        inactiveTabIcon: "#0E165C",
//        error: "#F44235",
//        inProgress: "#EBA905",
//        complete: "#20B832",
//        sourceBg: "#FCF7E3",
//      },
//      fonts: { default: null, "sans-serif": { url: null, active: true } },
//    },
//    uploadSuccess: handleUploadSuccess,
//  });
