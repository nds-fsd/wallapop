import React from 'react'
import styles from './images.module.css'


const Images = ({ images }) => {

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

    
    <img src={images[0]} className={styles.image}></img>
   
    {images === 0 && (
      <div className={styles.noImage}>
        <span className="icon-sad"></span>
        <p>Lo sentimos, no hay imágenes para mostrar</p>
    </div>
    )}
    </>

  );
};

export default Images;