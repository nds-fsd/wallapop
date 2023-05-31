import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./ProfileInfo.module.css";
import { AuthContext } from "../../../context/authContext";
import { getInfoUser } from "../../../utils/apiAuth";
import { useQuery, useQueryClient } from "react-query";
import Spinner from "../../Spinner/Spinner";

const ProfileInfo = () => {
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
      console.log("GET USER", data);
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
      <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.contentForm}>
            <div className={styles.divFoto}>
              <h2> Imagenes de perfil</h2>
              <div className={styles.infoFoto}>
                <div className={styles.changePhotoContainer}>
                  <img src={userData.photo} name="photo" />
                  <div className={styles.handleContainer}>
                    <button
                      onClick={handleOpenWidget}
                      className={styles.formButton}
                    >
                      Cambiar Foto
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.divInfoUser}>
              <h2>Información pública</h2>
              {/* FORMULARIO DATOS */}
              <form className={styles.formUser}>
                <div className={styles.errors}>
                  <label className={styles.labels}>
                    Nombre
                    <input
                      className={styles.inputProfile}
                      {...register("name", {
                        required: "El nombre es obligatorio",
                      })}
                    />
                  </label>
                </div>
                <div className={styles.error}>
                  {errors.name && (
                    <p>
                      <span className="icon-warning1"></span>
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className={styles.errors}>
                  <label className={styles.labels}>
                    Apellido
                    <input
                      className={styles.inputProfile}
                      name="surname"
                      placeholder="Apellido"
                      {...register("surname", {
                        required: "Surname is required",
                      })}
                    />
                  </label>
                </div>
                <div className={styles.error}>
                  {errors.surname && (
                    <p>
                      <span className="icon-warning1"></span>
                      {errors.surname.message}
                    </p>
                  )}
                </div>
                <label className={styles.labels}>
                  Direción
                  <input
                    className={styles.inputProfile}
                    placeholder="Direción"
                    {...register("adress")}
                  />
                </label>
                <div className={styles.errors}>
                  <label className={styles.labels}>
                    Teléfono
                    <input
                      className={styles.inputProfile}
                      placeholder="Teléfono"
                      {...register("phone", {
                        required: "Phone is required",
                      })}
                    />
                  </label>
                </div>
                <div className={styles.error}>
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
          <div className={styles.divButtons}>
            <button
              className={styles.formButton}
              type="submit"
              onClick={handleSubmit(handleSubmitWrapperUpdate)}
            >
              Guardar
            </button>
            <button
              className={styles.formButton2}
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
