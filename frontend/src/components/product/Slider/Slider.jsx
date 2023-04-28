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

    const [isHovering, setIsHovering] = useState(false);    
    const handleMouseEnter = () => {
        setIsHovering(true)
    };

    const handleMouseLeave = () => {
        setIsHovering(false)
    };
 


    return (
    <>
        {amount >= 1 && (
            <div className={styles.container}>
                <button onClick={prevImage} className={isHovering ? styles.buttonOpacity : styles.button}><span className='icon-undo2'></span></button>
                {images.map((image, index) => (
                    <div className={
                        currentImage === index ? `${styles.slide} ${styles.active}` 
                        : styles.slide }> 
                        {currentImage === index && (
                        <img key={index} src={image} alt={image}  onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.imgSlider}/>
                        )}
                    </div>   
                ))}
                <button onClick={nextImage} className={isHovering ? styles.buttonOpacity : styles.button}><span className='icon-redo2'></span></button>
            </div>
        )}

        {amount === 0 && (
            <div className={styles.noImage}>
                <span className='icon-sad'></span>
                <h1>Sorry, there are no available images to display yet</h1>
            </div>
        )}
    </>
    );
};

export default Slider;

//añadir puntitos parte baja imagen, cuando pasa a la siguiente
//evento del mouse cuando pasas por encima del boton siguiente - DONE
//click sobre la imagen, abre la imagen completa
