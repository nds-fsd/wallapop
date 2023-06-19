import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./loginUser.module.css";
import stylesDark from "./loginUserDark.module.css";
import { Navigate } from "react-router-dom";
import { getUserToken } from "../../utils/localStorage.utils";
import { AuthContext } from "../../context/authContext";
import { ThemeContext } from "../../context/themeContext";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleAuthLogin, loginError } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? stylesDark.mainContainer : styles.mainContainer}>
      <div
        className={darkMode ? stylesDark.loginContainer : styles.loginContainer}
      >
        <div>{getUserToken() && <Navigate to="/" />}</div>
        <h1>Inicia Sesión</h1>
        <form
          onSubmit={handleSubmit(handleAuthLogin)}
          className={darkMode ? stylesDark.formContainer : styles.formContainer}
        >
          <div className={darkMode ? stylesDark.register : styles.register}>
            <input
              type="email"
              placeholder="Email"
              className={darkMode ? stylesDark.input : styles.input}
              {...register("email", {
                required: "Email obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <input
              type="password"
              placeholder="Password"
              className={darkMode ? stylesDark.input : styles.input}
              {...register("password", {
                required: "Contraseña obligatoria",
              })}
            />
          </div>
          <div className={darkMode ? stylesDark.error : styles.error}>
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
          <div
            className={
              darkMode ? stylesDark.errorContainer : styles.errorContainer
            }
          >
            {loginError}
          </div>
          <button
            className={darkMode ? stylesDark.formButton : styles.formButton}
            data-test="boton"
            type="submit"
          >
            Inicia sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
