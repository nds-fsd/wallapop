import React, { useContext } from "react";
import styles from "./createProductPage.module.css";
import stylesDark from "./createProductPageDark.module.css";
import CreateProductNavBar from "../CreateProductNavBar/CreateProductNavBar";
import { Route, Routes } from "react-router-dom";
import {
  FORM_ELSE,
  FORM_HOUSE,
  FORM_JOB,
  FORM_VEHICLE,
} from "./routeCreateProd-paths";
import FormElse from "./FormElse";
import FormHouse from "./FormHouse";
import FormVehicle from "./FormVehicle";
import FormJob from "./FormJob";
import { ThemeContext } from "../../../context/themeContext";

const CreateProductPage = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <>
      <div
        className={
          darkMode
            ? stylesDark.createProductContainer
            : styles.createProductContainer
        }
      >
        <CreateProductNavBar />
        <Routes>
          <Route path={FORM_ELSE} element={<FormElse />} />
          <Route path={FORM_HOUSE} element={<FormHouse />} />
          <Route path={FORM_VEHICLE} element={<FormVehicle />} />
          <Route path={FORM_JOB} element={<FormJob />} />
        </Routes>
      </div>
    </>
  );
};

export default CreateProductPage;
