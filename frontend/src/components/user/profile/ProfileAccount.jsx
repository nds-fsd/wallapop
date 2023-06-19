import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./ProfileAccount.module.css";
import stylesDark from "./ProfileAccountDark.module.css";
import { getInfoUser } from "../../../utils/apiAuth";
import { useQuery, useQueryClient } from "react-query";
import Spinner from "../../Spinner/Spinner";
import { AuthContext } from "../../../context/authContext";
import { ThemeContext } from "../../../context/themeContext";

const ProfileAccount = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const { isLoading } = useQuery(["user"], getInfoUser, {
    onSuccess: (data) => {
      //para rellenar los campos con la info del usuario
      reset(data);
    },
  });

  const { handlerAuthUpdate, handlerAuthDelete } = useContext(AuthContext);

  // PARA EDITAR USER
  const handleSubmitWrapperUpdate = (data) => {
    console.log("VAS A EDITAR EL USUARIO", data);
    handlerAuthUpdate({ ...data });
  };

  // PARA ELIMINAR USER
  const handleSubmitWrapperDelete = (data) => {
    console.log("VAS A ELIMINAR EL USUARIO", data);
    handlerAuthDelete({ ...data });
  };

  if (isLoading) {
    return <Spinner size="M" />;
  } else {
    return (
      <div
        className={darkMode ? stylesDark.mainContainer : styles.mainContainer}
      >
        <div
          className={
            darkMode ? stylesDark.contentContainer : styles.contentContainer
          }
        >
          <h2> Información personal</h2>
          <form
            className={darkMode ? stylesDark.formPersonal : styles.formPersonal}
          >
            <label className={darkMode ? stylesDark.labels : styles.labels}>
              Email
              <input
                className={
                  darkMode ? stylesDark.inputProfile : styles.inputProfile
                }
                type="text"
                {...register("email")}
              />
            </label>
            <label
              className={
                darkMode ? stylesDark.labelsGenero : styles.labelsGenero
              }
            >
              Género
              <select
                {...register("gender", { required: true })}
                placeholder="Género"
                className={darkMode ? stylesDark.selectSexo : styles.selectSexo}
              >
                <option value="">Selecciona una opción</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="No Binario">No Binario</option>
                <option value="Prefiero no decirlo">Prefiero no decirlo</option>
              </select>
            </label>
          </form>
          <div className={darkMode ? stylesDark.divButtons : styles.divButtons}>
            <button
              className={darkMode ? stylesDark.formButton : styles.formButton}
              type="submit"
              disabled={!isValid}
              onClick={handleSubmit(handleSubmitWrapperUpdate)}
            >
              Guardar
            </button>
            <button
              className={darkMode ? stylesDark.formButton2 : styles.formButton2}
              type="submit"
              disabled={!isValid}
              onClick={handleSubmit(handleSubmitWrapperDelete)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileAccount;
