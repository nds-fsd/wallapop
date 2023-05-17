import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ProfileInfo.module.css";
import { AuthContext } from "../../../context/authContext";
import cld from "../../../utils/cloudinary-client";
import { useContext } from "react";
import { deleteUser, getInfoUser, modUser } from "../../../utils/apiAuth";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Spinner from "../../Spinner/Spinner";

const ProfileInfo = () => {
  const queryClient = useQueryClient();
  const [data, setData] = useState("");
  const { userData } = useContext(AuthContext);

  // cargar datos usuario
  const { data: datos, isLoading } = useQuery(["user"], getInfoUser);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    values: { ...datos },
  });

  if (!userData) return null;

  //otro mutation para el delate??
  const mutationDelete = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  const onSubmitDelete = (productData) => {
    console.log("PRODUCTDATA ", productData);
    mutationDelete.mutate(productData);
  };

  //Mutation para modificar user
  const mutationMod = useMutation(modUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });

  const onSubmit = (productData) => {
    console.log("PRODUCTDATA ", productData);
    mutationMod.mutate(productData);
  };

  if (isLoading) {
    return <Spinner size="M" />;
  } else {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
          <h2> Imagenes de perfil</h2>
          <div className={styles.infoFoto}>
            <h5> Foto principal </h5>
            <div className={styles.changePhotoContainer}>
              <div>
                <img src={userData.photo} />{" "}
              </div>
              <div className={styles.handleContainer}>
                <button className={styles.formButton}>Cambiar Foto</button>
                <p>Aceptamos fotos formato .jpg y minimo 400 x 400 px</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.contentContainer}>
          <h2>Información pública</h2>
          <form className={styles.formUser} onSubmit={handleSubmit(onSubmit)}>
            <label className={styles.labels}>
              Nombre
              <input
                className={styles.inputProfile}
                name="name"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && errors.name.type === "required" && (
                <span role="alert">This is required</span>
              )}{" "}
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
            <button
              className={styles.formButton}
              type="submit"
              disabled={!isValid || mutationMod.isLoading}
            >
              Guardar
            </button>
            <button
              className={styles.formButton2}
              type="submit"
              disabled={!isValid || mutationDelete.isLoading}
              onSubmit={handleSubmit(onSubmitDelete)}
            >
              Eliminar
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default ProfileInfo;
