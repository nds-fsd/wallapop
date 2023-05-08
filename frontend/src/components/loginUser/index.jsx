import React, { useState } from 'react';
import { useForm, } from 'react-hook-form';
import './loginUser.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { api } from '../../utils/apiProducts';
import { getUserToken } from '../../utils/localStorage.utils';
import { setUserSession } from '../../utils/localStorage.utils';
import { useMutation } from 'react-query';
import { loginUser } from '../../utils/apiAuth';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const login = useMutation(["user"],  loginUser);

  const handleLogin = (data) => {
    login.mutate(data, {
      onSuccess: (data) => {
        setUserSession(data);
        localStorage.setItem("user", JSON.stringify(data.user))
        navigate("/");
      }
    })
  }
  
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

<div className="loginContainer">
  <div>
    {getUserToken() && (
      <Navigate to="/" />
    )}
  </div>
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
