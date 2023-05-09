import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./loginUser.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserToken } from "../../utils/localStorage.utils";
import { setUserSession } from "../../utils/localStorage.utils";
import { useMutation } from "react-query";
import { loginUser } from "../../utils/apiAuth";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const login = useMutation(["user"], loginUser);

  const handleLogin = (data) => {
    login.mutate(data, {
      onSuccess: (data) => {
        setUserSession(data);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      },
    });
  };

  //   const handleLogin = async (userData) => {
  //   try {
  //     const response = await api.post("/user/login", userData);
  //     if (response.status === 200) {
  //       setUserSession(response.data.token);
  //       localStorage.setItem("user", JSON.stringify(response.data.user));
  //       navigate("/");
  //     }
  //     return response;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // };

  return (
    <>
      <div className={styles.loginContainer}>
        <div>{getUserToken() && <Navigate to="/" />}</div>
        <h1>Inicia Sesión</h1>
        <form
          onSubmit={handleSubmit(handleLogin)}
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
          <button className={styles.formButton} type="submit">
            Inicia sesión
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
