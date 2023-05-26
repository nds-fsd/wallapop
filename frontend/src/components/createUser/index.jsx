import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/authContext";
import styles from "./createUser.module.css";

const CreateUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleAuthRegister, showUploadWidget, image } =
    useContext(AuthContext);

  const handleOpenWidget = () => {
    showUploadWidget.open();
  };

  const handleSubmitWrapper = (data) => {
    handleAuthRegister({ ...data, photo: image });
  };

  return (
    <>
      <div className={styles.createUserContainer}>
        <h1>Regístrate</h1>
        <form
          onSubmit={handleSubmit(handleSubmitWrapper)}
          className={styles.formContainer}
        >
          <div className={styles.column}>
            <input
              type="text"
              placeholder="Nombre"
              className={styles.input}
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && <p>{errors.name.message}</p>}
            <input
              type="text"
              placeholder="Apellido"
              className={styles.input}
              {...register("surname", {
                required: "Surname is required",
              })}
            />
            {errors.surname && <p>{errors.surname.message}</p>}
          </div>
          <div className={styles.column}>
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className={styles.column}>
            <input
              type="text"
              placeholder="Teléfono"
              className={styles.input}
              {...register("phone", {
                required: "Phone is required",
              })}
            />
            {errors.phone && <p>{errors.phone.message}</p>}
            <input
              type="text"
              placeholder="Dirección"
              className={styles.input}
              {...register("adress")}
            />
            {errors.address && <p>{errors.address.message}</p>}
          </div>
          <div className={styles.column}>
            <input
              type="date"
              placeholder="Fecha de nacimiento"
              className={styles.input}
              {...register("birthday")}
            />
            {errors.birthday && <p>{errors.birthday.message}</p>}
            <select
              {...register("gender")}
              placeholder="Género"
              className={styles.dropdown}
            >
              <option value="">Selecciona una opción</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Binario">Binario</option>
              <option value="Prefiero no decirlo">Prefiero no decirlo</option>
            </select>
            {errors.gender && <p>{errors.gender.message}</p>}
          </div>

          <div className={styles.column}>
            <input
              className={styles.createUserButton}
              value="Registrate"
              type="submit"
            />
          </div>
        </form>
        <div className={styles.imageColumn}>
          <label htmlFor="images">Selecciona una imagen</label>
          <button onClick={handleOpenWidget} className={styles.image}>
            <span className="icon-image1"></span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateUserPage;
