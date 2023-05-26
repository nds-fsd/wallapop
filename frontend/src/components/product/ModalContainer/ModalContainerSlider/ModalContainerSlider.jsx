import React from "react";
import { useQuery } from "react-query";
import styles from "./modalContainerSlider.module.css";
import ModalContentSlider from "../ModalContentSlider/ModalContentSlider";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../../utils/apiProducts";

const ModalContainerSlider = ({ modalOpen, setModalOpen, images }) => {
  const params = useParams();
  const { data } = useQuery(
    ["product", params.productid],
    getProductById
  );

  return (
    <>
      {modalOpen && (
        <div className={styles.overlay}>
          <div className={styles.title}>
            <h3>Imágenes de: {data && data.title}</h3>
            <button
              className={styles.close}
              onClick={() => setModalOpen(false)}
            >
              <span className="icon-cross1"></span>
            </button>
            <div className={styles.line}></div>
          </div>
          {images && <ModalContentSlider images={images} />}
        </div>
      )}
    </>
  );
};

export default ModalContainerSlider;
