import React, { useState } from "react";
import styles from "./slider.module.css";
import ModalContainerSlider from "../ModalContainer/ModalContainerSlider/ModalContainerSlider";

const Slider = ({ images, data }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const amount = images.length;
  const nextImage = () => {
    setCurrentImage(currentImage === amount - 1 ? 0 : currentImage + 1);
  };
  const prevImage = () => {
    setCurrentImage(currentImage === 0 ? 1 : currentImage - 1);
  };

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {amount >= 1 && (
        <div className={styles.sliderContainer}>
          <div className={styles.container}>
            <button
              onClick={prevImage}
              className={isHovering ? styles.buttonOpacity : styles.button}
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
                    onMouseOver={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={styles.imgSlider}
                    onClick={() => setModalOpen(!modalOpen)}
                  />
                )}
              </div>
            ))}
            <button
              onClick={nextImage}
              className={isHovering ? styles.buttonOpacity : styles.button}
            >
              <span className="icon-redo2"></span>
            </button>
          </div>
          <p className={styles.statusTag}>{data && data.status}</p>
          
          {images && (
            <ModalContainerSlider modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            images={images} />
          )}

          <div className={styles.dotContainer}>
            {images.map((_, id) => (
              <div key={id} className={currentImage === id
                ? `${styles.dot} ${styles.dotactive}`
                : styles.dot }><span className="icon-ello"></span></div>
            ))}
          </div>

        </div>
      )}

      {amount === 0 && (
        <div className={styles.noImage}>
          <span className="icon-sad"></span>
          <h1>Sorry, there are no available images to display yet</h1>
        </div>
      )}
    </>
  );
};

export default Slider;

