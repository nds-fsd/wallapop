import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./ProfileInfo.module.css";
import stylesDark from "./ProfileInfoDark.module.css";
import { AuthContext } from "../../../context/authContext";
import { getInfoUser } from "../../../utils/apiAuth";
import { useQuery, useQueryClient } from "react-query";
import Spinner from "../../Spinner/Spinner";
import { ThemeContext } from "../../../context/themeContext";

const ProfileInfo = () => {
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
      // console.log("GET USER", data);
    },
  });

  const {
    userData,
    handlerAuthUpdate,
    handlerAuthDelete,
    showUploadWidget,
    image,
  } = useContext(AuthContext);

  const handleOpenWidget = () => {
    showUploadWidget.open();
  };

  // PARA EDITAR USER
  const handleSubmitWrapperUpdate = (data) => {
    console.log("VAS A EDITAR EL USUARIO", data);
    handlerAuthUpdate({ ...data, photo: image });
  };

  // PARA ELIMINAR USER
  const handleSubmitWrapperDelete = (data) => {
    const shouldDelete = window.confirm(
      "Estás a punto de borrar este producto. ¿Deseas continuar?"
    );
    if (shouldDelete) {
      console.log("VAS A ELIMINAR EL USUARIO", data);
      handlerAuthDelete({ ...data });
    }
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
          <div
            className={darkMode ? stylesDark.contentForm : styles.contentForm}
          >
            <div className={darkMode ? stylesDark.divFoto : styles.divFoto}>
              <h2> Imagenes de perfil</h2>
              <div className={darkMode ? stylesDark.infoFoto : styles.infoFoto}>
                <div
                  className={
                    darkMode
                      ? stylesDark.changePhotoContainer
                      : styles.changePhotoContainer
                  }
                >
                  <img src={userData.photo} name="photo" />
                  <div
                    className={
                      darkMode
                        ? stylesDark.handleContainer
                        : styles.handleContainer
                    }
                  >
                    <button
                      onClick={handleOpenWidget}
                      className={
                        darkMode ? stylesDark.formButton : styles.formButton
                      }
                    >
                      Cambiar Foto
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={darkMode ? stylesDark.divInfoUser : styles.divInfoUser}
            >
              <h2>Información pública</h2>
              {/* FORMULARIO DATOS */}
              <form
                className={darkMode ? stylesDark.formUser : styles.formUser}
              >
                <div className={darkMode ? stylesDark.errors : styles.errors}>
                  <label
                    className={darkMode ? stylesDark.labels : styles.labels}
                  >
                    Nombre
                    <input
                      className={
                        darkMode ? stylesDark.inputProfile : styles.inputProfile
                      }
                      {...register("name", {
                        required: "El nombre es obligatorio",
                      })}
                    />
                  </label>
                </div>
                <div className={darkMode ? stylesDark.error : styles.error}>
                  {errors.name && (
                    <p>
                      <span className="icon-warning1"></span>
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className={darkMode ? stylesDark.errors : styles.errors}>
                  <label
                    className={darkMode ? stylesDark.labels : styles.labels}
                  >
                    Apellido
                    <input
                      className={
                        darkMode ? stylesDark.inputProfile : styles.inputProfile
                      }
                      name="surname"
                      placeholder="Apellido"
                      {...register("surname", {
                        required: "Surname is required",
                      })}
                    />
                  </label>
                </div>
                <div className={darkMode ? stylesDark.error : styles.error}>
                  {errors.surname && (
                    <p>
                      <span className="icon-warning1"></span>
                      {errors.surname.message}
                    </p>
                  )}
                </div>
                <label className={darkMode ? stylesDark.labels : styles.labels}>
                  Direción
                  <input
                    className={
                      darkMode ? stylesDark.inputProfile : styles.inputProfile
                    }
                    placeholder="Direción"
                    {...register("adress")}
                  />
                </label>
                <div className={darkMode ? stylesDark.errors : styles.errors}>
                  <label className={styles.labels}>
                    Teléfono
                    <input
                      className={
                        darkMode ? stylesDark.inputProfile : styles.inputProfile
                      }
                      placeholder="Teléfono"
                      {...register("phone", {
                        required: "Phone is required",
                      })}
                    />
                  </label>
                </div>
                <div className={darkMode ? stylesDark.error : styles.error}>
                  {errors.phone && (
                    <p>
                      <span className="icon-warning1"></span>
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
          {/* DIV BOTONES */}
          <div className={darkMode ? stylesDark.divButtons : styles.divButtons}>
            <button
              className={darkMode ? stylesDark.formButton : styles.formButton}
              type="submit"
              onClick={handleSubmit(handleSubmitWrapperUpdate)}
            >
              Guardar
            </button>
            <button
              className={darkMode ? stylesDark.formButton2 : styles.formButton2}
              type="submit"
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

export default ProfileInfo;
