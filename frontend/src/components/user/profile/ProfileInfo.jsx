import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  return (
    <div>
      <div>
        <div>
          <h4> Imagenes de perfil</h4>
        </div>
        <div>
          <h5> Foto principal </h5>
        </div>
        <div>
          <img></img>
        </div>
        <div>
          <button>Cambiar Foto</button>
          <p>Aceptamos fotos formato .jpg y minimo 400 x 400 px</p>
        </div>
      </div>
      <div>
        <h4>Información pública</h4>
      </div>
      <div className={styles.formUser}>
        <form
          className={styles.formUser1}
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
  );
};

export default ProfileInfo;
