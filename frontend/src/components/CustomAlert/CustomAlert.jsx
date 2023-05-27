import React from "react";
import styles from "./customAlert.module.css";

const CustomAlert = ({ message, onClose }) => {
  return (
    <>
      <div className={styles.alert}>
        <h5>{message}</h5>
        <button className={styles.close} onClick={onClose}>
          <span className="icon-cross1"></span>
        </button>
      </div>
    </>
  );
};

export default CustomAlert;
