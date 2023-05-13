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

 const { handleAuth } = useContext(AuthContext);

  return (
    <>
      <div className={styles.loginContainer}>
        <div>{getUserToken() && <Navigate to="/" />}</div>
        <h1>Inicia Sesión</h1>
        <form
          onSubmit={handleSubmit(handleAuth)}
          className={styles.formContainer}
        >
          <div className={styles.register}>
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
          <button className={styles.formButton} data-test="boton" type="submit">
            Inicia sesión
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
