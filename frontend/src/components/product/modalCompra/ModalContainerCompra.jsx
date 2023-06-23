import React from "react";
import styles from "./modalContainer.module.css";
import ModalCompra from "./modalCompra";

const ModalContainer = ({ modalOpen, setModalOpen, id }) => {
  return (
    <>
      {modalOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.title}>
              <button
                className={styles.close}
                onClick={() => setModalOpen(false)}
              >
                <span className="icon-cross1"></span>
              </button>
            </div>
            {id && <ModalCompra id={id} />}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalContainer;
