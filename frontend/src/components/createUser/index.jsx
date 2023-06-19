import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/authContext";
import styles from "./createUser.module.css";
import stylesDark from "./createUserDark.module.css";
import { ThemeContext } from "../../context/themeContext";

const CreateUserPage = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    reset,
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
    <div className={darkMode ? stylesDark.mainContainer : styles.mainContainer}>
      <div
        className={
          darkMode ? stylesDark.createUserContainer : styles.createUserContainer
        }
      >
        <h1>Regístrate</h1>
        <div
          className={
            darkMode
              ? stylesDark.imageButtonContainer
              : styles.imageButtonContainer
          }
        >
          <label htmlFor="images">Selecciona una imagen</label>
          <button
            onClick={handleOpenWidget}
            className={
              darkMode && !image
                ? stylesDark.image
                : styles.image && !darkMode && !image
                ? styles.image
                : stylesDark.image
            }
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
          className={darkMode ? stylesDark.formContainer : styles.formContainer}
        >
          <div className={darkMode ? stylesDark.column : styles.column}>
            <div className={darkMode ? stylesDark.errors : styles.errors}>
              <input
                type="text"
                placeholder="Nombre"
                className={darkMode ? stylesDark.input : styles.input}
                {...register("name", {
                  required: "El nombre es obligatorio",
                })}
              />
            </div>
            <div className={darkMode ? stylesDark.errors : styles.errors}>
              <input
                type="text"
                placeholder="Apellido"
                className={darkMode ? stylesDark.input : styles.input}
                {...register("surname", {
                  required: "El apellido es obligatorio",
                })}
              />
            </div>
          </div>
          <div className={darkMode ? stylesDark.error : styles.error}>
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
          <div className={darkMode ? stylesDark.column : styles.column}>
            <div className={darkMode ? stylesDark.errors : styles.errors}>
              <input
                type="email"
                placeholder="Email"
                className={darkMode ? stylesDark.input : styles.input}
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            <div className={darkMode ? stylesDark.errors : styles.errors}>
              <input
                type="password"
                placeholder="Password"
                className={darkMode ? stylesDark.input : styles.input}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
              />
            </div>
          </div>

          <div className={darkMode ? stylesDark.error1 : styles.error1}>
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
          <div className={darkMode ? stylesDark.column : styles.column}>
            <div className={darkMode ? stylesDark.errors : styles.errors}>
              <input
                type="text"
                placeholder="Teléfono"
                className={darkMode ? stylesDark.input : styles.input}
                {...register("phone", {
                  required: "El teléfono es obligatorio",
                })}
              />
            </div>
            <input
              type="text"
              placeholder="Dirección"
              className={darkMode ? stylesDark.input : styles.input}
              {...register("address", {
                required: "La dirección es obligatoria",
              })}
            />
          </div>
          <div className={darkMode ? stylesDark.error : styles.error}>
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
          <div className={darkMode ? stylesDark.column : styles.column}>
            <input
              type="date"
              placeholder="Fecha de nacimiento"
              className={darkMode ? stylesDark.input : styles.input}
              {...register("birthday")}
            />
            {errors.birthday && (
              <p className={darkMode ? stylesDark.error : styles.error}>
                <span className="icon-warning1"></span>
                {errors.birthday.message}
              </p>
            )}
            <select
              {...register("gender")}
              placeholder="Género"
              className={darkMode ? stylesDark.dropdown : styles.dropdown}
              name="gender"
            >
              <option value="">Selecciona un género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="No Binario">No Binario</option>
              <option value="Prefiero no decirlo">Prefiero no decirlo</option>
            </select>
            {errors.gender && (
              <p className={darkMode ? stylesDark.error : styles.error}>
                <span className="icon-warning1"></span>
                {errors.gender.message}
              </p>
            )}
          </div>

          <input
            className={
              darkMode ? stylesDark.createUserButton : styles.createUserButton
            }
            value="Regístrate"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateUserPage;
