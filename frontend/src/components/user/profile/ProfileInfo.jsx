import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ProfileInfo.module.css";
import style from "./index.module.css"
import image from "../../../assets/images/pexels-pixabay-415829.jpg"

const ProfileInfo = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  return (
    <div className={style.mainContainer}>
      <div className={style.contentContainer}>
          <h4> Imagenes de perfil</h4>
          <h5> Foto principal </h5>
          <div className={styles.changePhotoContainer}>
           <div>
            <img src={image} />
           </div>
           <div className={styles.handleContainer}>
              <button>Cambiar Foto</button>
              <p>Aceptamos fotos formato .jpg y minimo 400 x 400 px</p>
            </div> 
          </div>
      </div>
      <div className={style.contentContainer}>
        <h4>Información pública</h4>
        <div className={styles.formUser}>
          <form
            onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
          >
            <label>
              Nombre
              <input {...register("name")} />
            </label>
            <label>
              Apellido
              <input {...register("surname")} />
            </label>
            <label>
              Ubicación de tus productos
              <input {...register("adress")} />
            </label>
            <label>
              Descripción
              <textarea {...register("description")} />
            </label>
            <label>
              Teléfono
              <input {...register("phone")} />
            </label>
            <input type="submit" value="Guardar" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
