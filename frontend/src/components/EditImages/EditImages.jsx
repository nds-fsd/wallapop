import React, { useContext, useEffect, useState } from "react";
import styles from "./editImages.module.css";
import { AuthContext } from "../../context/authContext";

const EditImages = ({
  product,
  reset,
  handleImageUpload,
  handleRemoveImage,
}) => {
  const imagesUploaded = product && product.images;
  const { multipleUploadWidget, images, setImages } = useContext(AuthContext);

  const handleOpenWidget = (event) => {
    event.preventDefault();
    multipleUploadWidget.open();
  };

  const handleFileChange = (event, index) => {
    const files = event.target.files;
    handleImageUpload(files, index);
    const uploadedImage = images[index];
  
    setImages((imagesUploaded) => {
      const updatedImages = [...imagesUploaded, uploadedImage];
      return updatedImages;
    });
  };
 
  const remainingSlots = Math.max(6 - images.length, 0);

  useEffect(() => {
    reset({ images: product.images });
  }, [product, reset]);

  return (
    <>
      <div className={styles.double}>
        <label htmlFor="images" className={styles.labels}>
          Imágenes:
        </label>
        <div className={styles.images}>
          {imagesUploaded && imagesUploaded.length > 0 ? (
            <>
              {imagesUploaded.map((image, index) => (
                <div className={styles.imgList} key={index}>
                  <img className={styles.image} src={image}></img>
                  <div>
                    <button onClick={() => handleRemoveImage(index)} />
                    <span className="icon-cross1"></span>
                  </div>
                </div>
              ))}
              {images &&
                images.map((preview, index) => (
                  <div key={index} className={styles.imgList}>
                    <img src={preview} />
                    <div>
                      <button onClick={() => handleRemoveImage(index)} />
                      <span className="icon-cross1"></span>
                    </div>
                  </div>
                ))}
              {Array.from({
                length: Math.max(6 - imagesUploaded.length - images.length, 0),
              }).map((_, index) => (
                <div
                  key={index + imagesUploaded.length + images.length}
                  className={styles.imgRemaining}
                >
                  <button onClick={handleOpenWidget} className={styles.remain}>
                    <span className="icon-image1"></span>
                  </button>
                </div>
              ))}
            </>
          ) : (
            <div className={styles.noImage}>
              <p>Aún no has subido imágenes</p>
              <div className={styles.imgUpload}>
                {images &&
                  images.map((preview, index) => (
                    <div key={index} className={styles.imgList}>
                      <img src={preview} />
                      <div>
                        <button onClick={() => handleRemoveImage(index)} />
                        <span className="icon-cross1"></span>
                      </div>
                    </div>
                  ))}

                {Array.from({ length: remainingSlots }).map((_, index) => (
                  <div
                    key={index + images.length}
                    className={styles.imagePreview}
                  >
                    <button onClick={handleOpenWidget} className={styles.img}>
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditImages;
