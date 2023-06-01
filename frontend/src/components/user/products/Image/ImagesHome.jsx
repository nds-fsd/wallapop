import React from "react";
import styles from "./imagesHome.module.css";

const ImagesHome = ({ images, category, status }) => {
  const mockImages = [
    "https://picsum.photos/id/1/250/300",
    "https://picsum.photos/id/2/250/300",
    "https://picsum.photos/id/3/250/300",
  ];

  // console.log("en las imagenes", status)
  return (
    <>
      {/* {images >1 && (
      <div>
        {images[0]}
      </div>
    )} */}

      <div className={styles.icon}>
        <img src={mockImages[0]} className={styles.image}></img>
        <div className={styles.tags}>
        <p className={styles.status}>{status}</p>
        {category && category.map((cat) => <span className={cat.logo} />
        )}
        </div>
        
      </div>

      {images === 0 && (
        <div className={styles.noImage}>
          <span className="icon-sad"></span>
        </div>
      )}
    </>
  );
};

export default ImagesHome;
