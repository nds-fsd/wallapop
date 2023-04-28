import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './loginUser.module.css';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const handleLogin = async (userData) => {
  try {
    const response = await axios.post("/user/login", userData);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

  return (
    <div className="loginContainer">
  <div className="formContainer">
    <h1 className="formTitle">Inicia Sesión</h1>
    <form onSubmit={handleSubmit(handleLogin)}>
      <input
        type="email"
        placeholder="Email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          },
        })}
        className="formInput"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        type="password"
        placeholder="Password"
        {...register('password', {
          required: 'Password is required',
        })}
        className="formInput"
      />
      {errors.password && <p>{errors.password.message}</p>}
      <button className="formButton" type="submit">
        Inicia sesión
      </button>
    </form>
  </div>
</div>
  );
};

export default LoginPage;
