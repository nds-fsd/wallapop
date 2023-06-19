import React, { useContext } from "react";
import { useQuery } from "react-query";
import styles from "./modalContainerSlider.module.css";
import stylesDark from "./modalContainerSliderDark.module.css";
import ModalContentSlider from "../ModalContentSlider/ModalContentSlider";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../../utils/apiProducts";
import { ThemeContext } from "../../../../context/themeContext";

const ModalContainerSlider = ({ modalOpen, setModalOpen, images }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const params = useParams();
  const { data } = useQuery(["product", params.productid], getProductById);

  return (
    <>
      {modalOpen && (
        <div className={darkMode ? stylesDark.overlay : styles.overlay}>
          <div className={darkMode ? stylesDark.title : styles.title}>
            <h3>Imágenes de: {data && data.title}</h3>
            <button
              className={darkMode ? stylesDark.close : styles.close}
              onClick={() => setModalOpen(false)}
            >
              <span className="icon-cross1"></span>
            </button>
            <div className={darkMode ? stylesDark.line : styles.line}></div>
          </div>
          {images && <ModalContentSlider images={images} />}
        </div>
      )}
    </>
  );
};

export default ModalContainerSlider;
