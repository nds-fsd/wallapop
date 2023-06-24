import React from "react";
import styles from "./modalContainer.module.css";
import ModalCompra from "./modalCompra";

const ModalContainerCompra = ({ modalOpen, setModalOpen, data }) => {
  return (
    <>
      {modalOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.title}>
              <h2>Modo COOMPRA</h2>
              <button
                className={styles.close}
                onClick={() => setModalOpen(false)}
              >
                <span className="icon-cross1"></span>
              </button>
            </div>
            {data && (
              <ModalCompra
                data={data}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalContainerCompra;
