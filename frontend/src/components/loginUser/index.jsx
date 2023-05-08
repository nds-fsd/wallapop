import React, { useState } from 'react';
import { useForm, } from 'react-hook-form';
import styles from './loginUser.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUserToken } from '../../utils/localStorage.utils';
import { setUserSession } from '../../utils/localStorage.utils';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  
  const handleLogin = async (userData) => {
  try {
    const response = await api.post("/user/login", userData);
    if (response.status === 200) {
      setUserSession(response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    }
    return response;
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 404) {
      errors.email = { message: 'Usuario no encontrado, regístrate para continuar.' };
    } else {
      throw error;
    }
  }
};

return (
  <div className={styles.loginContainer}>
    <div>
      {getUserToken() && (
        <Navigate to="/" />
      )}
    </div>
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Inicia Sesión</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: '*Introduce tu email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: '*Email incorrecto',
            },
          })}
          className={styles.formInput}
        />
        {errors.email && <p className={styles.formError}>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Contraseña"
          {...register('password', {
            required: '*Introduce tu contraseña',
          })}
          className={styles.formInput}
        />
        {errors.password && <p className={styles.formError}>{errors.password.message}</p>}
        <button className={styles.formButton} type="submit">
          Inicia sesión
        </button>
      </form>
      <p className={styles.formMessage}>¿No tienes una cuenta?<span ><Link to="/register">{' Regístrate'}</Link></span>
      </p>
    </div>
  </div>
);
};

export default LoginPage;
