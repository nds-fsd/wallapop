import React from "react";
import styles from "./map.module.css";

const Map = () => {
  return (
    <>
      <div>
        <h2>Localización</h2>
        <div className={styles.line}></div>
        <input
          placeholder="Señala dónde se ubica tu producto"
          className={styles.input}
        ></input>
        <iframe
          className={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.478514922809!2d2.172423176603154!3d41.40713017129735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a3aca82e7035%3A0x3941330f1c5d23d7!2sNuclio%20Digital%20School!5e0!3m2!1szh-CN!2ses!4v1682378793204!5m2!1szh-CN!2ses"
          // style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <label htmlFor="map">
        <p>
          Ésta es la ubicación de tu perfil de ReTrend. En ella aparecerán tus
          productos.
        </p>
      </label>
    </>
  );
};
export default Map;
