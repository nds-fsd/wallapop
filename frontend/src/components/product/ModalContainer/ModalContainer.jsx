import React from "react";
import styles from "./modalContainer.module.css";
import ModalContent from "./ModalContent";

const ModalContainer = ({ modalOpen, setModalOpen, prod }) => {
  

  return (
    <>
      {modalOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.title}>
              <h3>Modo edición</h3>
              <button className={styles.close} onClick={()=> setModalOpen(false)}>
                <span className="icon-cross1"></span>
              </button>
            </div>
            {prod && <ModalContent prod={prod} />}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalContainer;
