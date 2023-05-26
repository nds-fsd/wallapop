import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./loginUser.module.css";
import { Navigate } from "react-router-dom";
import { getUserToken } from "../../utils/localStorage.utils";
import { AuthContext } from "../../context/authContext";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleAuthLogin } = useContext(AuthContext);

  return (
    <>
      <div className={styles.loginContainer}>
        <div>{getUserToken() && <Navigate to="/" />}</div>
        <h1>Inicia Sesión</h1>
        <form
          onSubmit={handleSubmit(handleAuthLogin)}
          className={styles.formContainer}
        >
          <div className={styles.register}>
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
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
              className={styles.input}
              {...register("password", {
                required: "Contraseña obligatoria",
              })}
            />
          </div>
          <div className={styles.error}>
            {errors.email && <p><span className="icon-warning1"></span>{errors.email.message}</p>}
            {errors.password && <p><span className="icon-warning1"></span>{errors.password.message}</p>}
          </div>
          <div className={styles.errorContainer}>{loginError}</div>
          <button className={styles.formButton} data-test="boton" type="submit">
            Inicia sesión
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
