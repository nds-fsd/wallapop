import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ProfileInfo.module.css";
import { AuthContext } from "../../../context/authContext";
import { getInfoUser } from "../../../utils/apiAuth";
import { useQuery, useQueryClient } from "react-query";
import Spinner from "../../Spinner/Spinner";
import { useNavigate } from "react-router-dom";

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
    },
  });

  const {
    userData,
    handlerAuthUpdate,
    handlerAuthDelete,
    showUploadWidget,
    image,
  } = useContext(AuthContext);

  const [updateChanges, setUpdateChanges] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [profileDeleted, setProfileDeleted] = useState(false);

  const navigate = useNavigate();

  const handleAlertUpdate = () => {
    setUpdateChanges(false);
  };

  const handleCancel = () => {
    setDeleteProfile(false);
  };

  const handleAcceptDelete = (data) => {
    handlerAuthDelete({ ...data });
    setDeleteProfile(true);
    setProfileDeleted(false);
  };

  const handleOpenWidget = () => {
    showUploadWidget.open();
  };

  // PARA EDITAR USER
  const handleSubmitWrapperUpdate = (data) => {
    handlerAuthUpdate({ ...data, photo: image });
    // window.alert("Usuario editado correctamente");
    setUpdateChanges(true);
  };

  // PARA ELIMINAR USER
  // const handleSubmitWrapperDelete = (data) => {
  //   const shouldDelete = window.confirm(
  //     "Estás a punto de borrar este producto. ¿Deseas continuar?"
  //   );
  //   if (shouldDelete) {
  //     handlerAuthDelete({ ...data });
  //   }
  // };

  const handleSubmitWrapperDelete = (data) => {
    handlerAuthDelete({ ...data });
    setDeleteProfile(false);
    setProfileDeleted(true);
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 1500);
  };

  return (
    <>
      {isLoading ? (
        <div>
          <Spinner size="M" />
        </div>
      ) : (
        <>
          {updateChanges && (
            <div className={styles.alert}>
              Usuario editado correctamente
              <button onClick={handleAlertUpdate} className={styles.accept}>
                Aceptar
              </button>
            </div>
          )}
          {deleteProfile && (
            <div className={styles.alert}>
              Estás a punto de borrar tu perfil. ¿Deseas continuar?
              <div className={styles.alertButtons}>
                <button
                  onClick={handleSubmitWrapperDelete}
                  className={styles.accept}
                >
                  Aceptar
                </button>
                <button onClick={handleCancel} className={styles.accept}>
                  Cancelar
                </button>
              </div>
            </div>
          )}
          {profileDeleted && (
            <h4 className={styles.alert}>
              Perfil eliminado con éxito. Esperamos que hayas disfrutado de tu experiencia en ReTrend
              ¡¡Vuelve cuando quieras!!
            </h4>
          )}
          <div className={styles.mainContainer}>
            <div className={styles.contentContainer}>
              <div className={styles.contentForm}>
                <div className={styles.divFoto}>
                  <h2> Imágenes de perfil</h2>
                  <div className={styles.infoFoto}>
                    <div className={styles.changePhotoContainer}>
                     { userData.photo ? 
                     <img src={image !== userData.photo ? image : userData.photo } name="photo" />
                     : 
                     <img src={"https://res.cloudinary.com/dvogntdp2/image/upload/v1687880800/s9jq5uchu8mcvbftlqfj.jpg"} name="photo" /> }
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
                      Dirección
                      <input
                        className={styles.inputProfile}
                        placeholder="Dirección"
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
                  // onClick={() => setDeleteProfile(true)}
                  // onClick={handleSubmit(handleSubmitWrapperDelete)}
                  // onClick={handleSubmitWrapperDelete}
                  onClick={handleAcceptDelete}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileInfo;
