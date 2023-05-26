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
    console.log("VAS A ELIMINAR EL USUARIO", data);
    handlerAuthDelete({ ...data, photo: image });
  };

  if (isLoading) {
    return <Spinner size="M" />;
  } else {
    return (
      <div className={styles.mainContainer}>
        {/* FORMULARIO IMAGENES */}
        <form
          className={styles.contentContainer}
          onSubmit={handleSubmit(handleSubmitWrapperUpdate)}
        >
          <h2> Imagenes de perfil</h2>
          <div className={styles.infoFoto}>
            <div className={styles.changePhotoContainer}>
              <div>
                <img src={userData.photo} name="photo" />
                <h4>{userData.photo}</h4>
              </div>
              <div className={styles.handleContainer}>
                <button
                  onClick={handleOpenWidget}
                  className={styles.formButton}
                >
                  Cambiar Foto
                </button>
                <button
                  type="sumbit"
                  // onSubmit={handleSubmit(handleSubmitWrapperUpdate)}
                >
                  Guardar
                </button>
                <p>Aceptamos fotos formato .jpg y minimo 400 x 400 px</p>
              </div>
            </div>
          </div>
        </form>

        <div className={styles.contentContainer}>
          <h2>Información pública</h2>
          {/* FORMULARIO DATOS */}
          <form className={styles.formUser}>
            <label className={styles.labels}>
              Nombre
              <input
                className={styles.inputProfile}
                // placeholder="Nombre"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && <span>This field is required</span>}
              {/* {errors.name && errors.name.type === "required" && (
                <span role="alert">This is required</span>
              )} */}
            </label>
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
              {errors?.surname?.message}
            </label>
            <label className={styles.labels}>
              Direción
              <input
                className={styles.inputProfile}
                placeholder="Direción"
                {...register("adress")}
              />
            </label>
            <label className={styles.labels}>
              Descripción
              <textarea
                className={styles.inputProfile}
                {...register("description")}
              />
            </label>
            <label className={styles.labels}>
              Teléfono
              <input
                className={styles.inputProfile}
                placeholder="Teléfono"
                {...register("phone")}
              />
            </label>
          </form>
          <div className={styles.divButtons}>
            <button
              className={styles.formButton}
              type="submit"
              disabled={!isValid}
              onClick={handleSubmit(handleSubmitWrapperUpdate)}
            >
              Guardar
            </button>
            <button
              className={styles.formButton2}
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

export default ProfileInfo;
