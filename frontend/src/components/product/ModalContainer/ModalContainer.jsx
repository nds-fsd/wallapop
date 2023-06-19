import React, { useContext } from "react";
import styles from "./modalContainer.module.css";
import stylesDark from "./modalContainerDark.module.css";
import ModalContent from "./ModalContentProdUser/ModalContent";
import { ThemeContext } from "../../../context/themeContext";

const ModalContainer = ({ modalOpen, setModalOpen, id }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <>
      {modalOpen && (
        <div className={darkMode ? stylesDark.overlay : styles.overlay}>
          <div className={darkMode ? stylesDark.modal : styles.modal}>
            <div className={darkMode ? stylesDark.title : styles.title}>
              <h2>Modo edición</h2>
              <button
                className={darkMode ? stylesDark.close : styles.close}
                onClick={() => setModalOpen(false)}
              >
                <span className="icon-cross1"></span>
              </button>
            </div>
            {id && <ModalContent id={id} />}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalContainer;
