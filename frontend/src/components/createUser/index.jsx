import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/authContext";
import { ImageContext } from "../../context/imageContext";
import styles from "./createUser.module.css";

const CreateUserPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { handleAuth, registerError } = useContext(AuthContext);
  const { showUploadWidget, image } = useContext(ImageContext);

  const handleOpenWidget = () => {
    showUploadWidget.open();
  };

  const handleSubmitWrapper = (data) => {
    handleAuth({ ...data, photo: image });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.createUserContainer}>
        <h1>Regístrate</h1>
        <div className={styles.imageButtonContainer}>
          <label htmlFor="images">Selecciona una imagen</label>
          <button
            onClick={handleOpenWidget}
            className={!image ? styles.image : styles.noimage}
          >
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
            <div className={styles.errors}>
              <input
                type="text"
                placeholder="Nombre"
                className={styles.input}
                {...register("name", {
                  required: "El nombre es obligatorio",
                })}
              />
            </div>
            <div className={styles.errors}>
              <input
                type="text"
                placeholder="Apellido"
                className={styles.input}
                {...register("surname", {
                  required: "El apellido es obligatorio",
                })}
              />
            </div>
          </div>
          <div className={styles.error}>
            {errors.name && (
              <p>
                <span className="icon-warning1"></span>
                {errors.name.message}
              </p>
            )}

            {errors.surname && (
              <p>
                <span className="icon-warning1"></span>
                {errors.surname.message}
              </p>
            )}
          </div>
          <div className={styles.column}>
            <div className={styles.errors}>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              
            </div>
            <div className={styles.errors}>
              <input
                type="password"
                placeholder="Password"
                className={styles.input}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
              />
              
            </div>
          </div>

          <div className={styles.error1}>
          {errors.email && (
                <p>
                  <span className="icon-warning1"></span>
                  {errors.email.message}
                </p>
              )}
              {errors.password && (
                <p>
                  <span className="icon-warning1"></span>
                  {errors.password.message}
                </p>
              )}
          </div>
          <div className={styles.column}>
            <div className={styles.errors}>
              <input
                type="text"
                placeholder="Teléfono"
                className={styles.input}
                {...register("phone", {
                  required: "El teléfono es obligatorio",
                })}
              />
            </div>
            <input
              type="text"
              placeholder="Dirección"
              className={styles.input}
              {...register("address", {
                required: "La dirección es obligatoria",
              })}
            />
          </div>
          <div className={styles.error}>
            {errors.phone && (
              <p>
                <span className="icon-warning1"></span>
                {errors.phone.message}
              </p>
            )}
            {errors.address && (
              <p>
                <span className="icon-warning1"></span>
                {errors.address.message}
              </p>
            )}
          </div>
          <div className={styles.column}>
            <input
              type="date"
              placeholder="Fecha de nacimiento"
              className={styles.input}
              {...register("birthday")}
            />
            {errors.birthday && (
              <p className={styles.error}>
                <span className="icon-warning1"></span>
                {errors.birthday.message}
              </p>
            )}
            <select
              {...register("gender")}
              placeholder="Género"
              className={styles.dropdown}
            >
              <option value="">Selecciona un género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="No Binario">Binario</option>
              <option value="Prefiero no decirlo">Prefiero no decirlo</option>
            </select>
            {errors.gender && (
              <p className={styles.error}>
                <span className="icon-warning1"></span>
                {errors.gender.message}
              </p>
            )}
          </div>

          <input
            className={styles.createUserButton}
            value="Regístrate"
            type="submit"
          />
        </form>
        <div>{registerError}</div>
      </div>
    </div>
  );
};

export default CreateUserPage;
