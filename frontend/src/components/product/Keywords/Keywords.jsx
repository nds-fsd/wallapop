import React, { useEffect, useState } from "react";
import styles from "./keywords.module.css";

const Keywords = ({ data }) => {
  console.log(data);
  const words = data.keywords;
  console.log(words);

  return (
    <>
      {Array.isArray(words) && words != '' && (
        <ul className={styles.keywords}>
          {words.map((word, index) => (
            <li key={index} className={styles.list}>{`#${word}`}</li>
          ))}
        </ul>
      )}

      {/* {Array.isArray(prod.keywords) && prod.keywords.length > 0 && (
        <ul className={styles.keywords}>
          {words.map((word, index) => {
            const trimmedWord = word.trim();
            if (trimmedWord !== '') {
              return <li key={index}>{`#${trimmedWord}`}</li>;
            }
            return null;
          })}
        </ul>
      )}   */}
    </>
  );
};

export default Keywords;
