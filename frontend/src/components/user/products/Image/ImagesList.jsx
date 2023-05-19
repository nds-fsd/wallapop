import React from 'react'
import styles from './images.module.css'


const ImagesList = ({ images }) => {

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

    
    <img src={mockImages[0]} className={styles.imgList}></img>
   
    {images === 0 && (
      <div className={styles.noImage}>
        <span className="icon-sad"></span>
    </div>
    )}
    </>

  );
};

export default ImagesList;