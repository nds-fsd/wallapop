import React, { useState } from 'react';
import styles from './slider.module.css'

const Slider = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const amount = images.length;
    const nextImage = () => {
        setCurrentImage(currentImage === amount -1 ? 0 : currentImage + 1)
    }
    const prevImage = () => {
        setCurrentImage(currentImage === 0 ? 1 : currentImage - 1)
    }

    return (
    <>
        <div className={styles.container}>
            <button onClick={prevImage} className={styles.button}>-</button>
            
            {images.map((image, index) => (
                <div className={
                    currentImage === index ? `${styles.slide} ${styles.active}` 
                    : styles.slide
                    }> 
                    {currentImage === index && (
                    <img key={index} src={image} alt={image} />
                    )}
                </div>
            ))}

            {amount === 0 && (
                <div className={styles.noImage}>No available image</div>
            )}

            <button onClick={nextImage} className={styles.button}>+</button>
        </div>
    </>
    );
};

export default Slider;

//añadir puntitos parte baja imagen, cuando pasa a la siguiente
//evento del mouse cuando pasas por encima del boton siguiente
//click sobre la imagen, abre la imagen completa