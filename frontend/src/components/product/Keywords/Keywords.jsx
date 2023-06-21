import React from "react";
import styles from "./keywords.module.css";

const Keywords = ({ data }) => {
  const words = data?.keywords || [];
  // console.log(words);

  return (
    <>
      {Array.isArray(words) && words.length > 0 && (
        <ul className={styles.keywords}>
          {words.map((word, index) => {
            const trimmedWord = word.trim();
            if (trimmedWord !== "") {
              return (
                <li key={index} className={styles.list}>{`#${trimmedWord}`}</li>
              );
            }
            return null;
          })}
        </ul>
      )}
    </>
  );
};

export default Keywords;
