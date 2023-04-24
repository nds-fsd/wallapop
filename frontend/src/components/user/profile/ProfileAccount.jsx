import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ProfileAccount.module.css";

const ProfileAccount = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  return (
    <div>
      <div>
        <h4> Información personal</h4>
        <form
          className={styles.formUser}
          onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
        >
          <label>
            Fecha de nacimiento
            <input type="date" {...register("birthday")} />
          </label>
          <label>
            Sexo
            <input type="radio" value="Hombre" {...register("gender")} />
            <input type="radio" value="Mujer" {...register("gender")} />
          </label>
          <input type="submit" value="Guardar" />
        </form>
      </div>
      <div>
        <h4>Información cuenta</h4>
        <form
          className={styles.formUser}
          onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
        >
          <label>
            Email
            <input type="text" {...register("email")} />
          </label>
          <input type="submit" value="Guardar" />
        </form>
        <button>Eliminar cuenta</button>
      </div>
    </div>
  );
};

export default ProfileAccount;
