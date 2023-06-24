import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./ProfileAccount.module.css";
import { getInfoUser } from "../../../utils/apiAuth";
import { useQuery, useQueryClient } from "react-query";
import Spinner from "../../Spinner/Spinner";
import { AuthContext } from "../../../context/authContext";

const ProfileAccount = () => {
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
    handlerAuthUpdate({ ...data });
    window.alert("Usuario editado correctamente");
  };

  // PARA ELIMINAR USER
  const handleSubmitWrapperDelete = (data) => {
    const shouldDelete = window.confirm(
      "Estás a punto de borrar este producto. ¿Deseas continuar?"
    );
    if (shouldDelete) {
      handlerAuthDelete({ ...data });
    }
  };

  if (isLoading) {
    return <Spinner size="M" />;
  } else {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
          <h2> Información personal</h2>
          <form className={styles.formPersonal}>
            <label className={styles.labels}>
              Email
              <input
                className={styles.inputProfile}
                type="text"
                {...register("email")}
              />
            </label>
            <label className={styles.labelsGenero}>
              Género
              <select
                {...register("gender", { required: true })}
                placeholder="Género"
                className={styles.selectSexo}
              >
                <option value="">Selecciona una opción</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="No Binario">No Binario</option>
                <option value="Prefiero no decirlo">Prefiero no decirlo</option>
              </select>
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

export default ProfileAccount;
