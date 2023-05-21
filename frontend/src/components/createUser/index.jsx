import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/authContext";
import { ImageContext } from "../../context/imageContext";
import styles from "./createUser.module.css";

const CreateUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleAuth, registerError } = useContext(AuthContext);
  const { showUploadWidget, image } = useContext(ImageContext);

  const handleOpenWidget = () => {
    showUploadWidget.open();
  };

  const handleSubmitWrapper = (data) => {
    handleAuth({...data, photo: image });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.createUserContainer}>
        <h1>Regístrate</h1>
        <div className={styles.imageButtonContainer}>
          <label htmlFor="images">Selecciona una imagen</label>
          <button onClick={handleOpenWidget} className={!image?styles.image : styles.noimage}>
            {!image ? (
              <span className="icon-image1"></span>
            ) : (
              <img src={image} />
            )}
          </button>
        </div>
        <form
          onSubmit={handleSubmit(handleSubmitWrapper)}
          className={styles.formContainer}
        >
          <div className={styles.column}>
            <div className={styles.errorContainer}>
              <input
                type="text"
                placeholder="Nombre"
                className={styles.input}
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className={styles.errorContainer}>
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
          </div>
          <div className={styles.column}>
            <div className={styles.errorContainer}>
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
            </div>
            <div className={styles.errorContainer}>
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
          </div>
          <div className={styles.column}>
            <div className={styles.errorContainer}>
              <input
                type="text"
                placeholder="Teléfono"
                className={styles.input}
                {...register("phone", {
                  required: "Phone is required",
                })}
              />
              {errors.phone && <p>{errors.phone.message}</p>}
            </div>
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
              <option value="No Binario">Binario</option>
              <option value="Prefiero no decirlo">Prefiero no decirlo</option>
            </select>
            {errors.gender && <p>{errors.gender.message}</p>}
          </div>

          <input
            className={styles.createUserButton}
            value="Registrate"
            type="submit"
          />
        </form>
        <div>{registerError}</div>
      </div>
    </div>
  );
};

export default CreateUserPage;
