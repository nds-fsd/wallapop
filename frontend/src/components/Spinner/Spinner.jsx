import React, { useEffect, useState } from "react";
import styles from "./spinner.module.css";
import BeatLoader from "react-spinners/BeatLoader";
import GridLoader from "react-spinners/GridLoader";
import RiseLoader from "react-spinners/RiseLoader";
import loadingGif from "../../../../frontend/storage/cochecito.svg";
import cx from "classnames";
// sizes available are 'S' | 'M'  | 'L'
const Spinner = ({ size = "M" }) => {
  return (
    <>
      <div className={styles.spinner}>
        <img
          //permite escoger una clase o otra cosa a partir de un valor
          // hacer una ternaria
          className={cx({
            [styles.small]: size === "S",
            [styles.medium]: size === "M",
            [styles.large]: size === "L",
          })}
          src="/storage/cochecito.svg"
          alt="wait until the page loads"
        />
        {/* <loadingGif loading={loading} size={30}></loadingGif> */}
        {/* <BeatLoader color={"rgb(40, 51, 158)"} loading={loading} size={30} /> */}
        {/* <GridLoader color={'rgb(40, 51, 158)'} loading={loading} size={40} /> */}
        {/* <RiseLoader color={'rgb(40, 51, 158)'} loading={loading} size={20} /> */}
      </div>
    </>
  );
};

export default Spinner;
