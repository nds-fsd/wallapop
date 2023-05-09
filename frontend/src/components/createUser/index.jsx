import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './createUser.module.css';
import { setUserSession } from '../../utils/localStorage.utils';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';

const CreateUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleCreateUser = async (userData) => {
    try {
      const response = await api.post("/user/register", userData);
      if (response.status === 201) {
        setUserSession(response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <h1 className= {styles.formTitle}>Regístrate</h1>
        <form onSubmit={handleSubmit(handleCreateUser)}>
          <input
            type="text"
            placeholder="Nombre"
            {...register('name', {
              required: 'Introduzca su nombre',
            })}
          />
          {errors.name && <p className={styles.formError}>{errors.name.message}</p>}
          <input className={styles.inputRegister}
            type="text"
            placeholder="Apellido"
            {...register('surname', {
              required: 'Introduzca su apellido',
            })}
          />
          {errors.surname && <p className={styles.formError}>{errors.surname.message}</p>}
          <input className={styles.inputRegister}
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'introduzca su Email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <p className={styles.formError}>{errors.email.message}</p>}
          <input className={styles.inputRegister}
            type="password"
            placeholder="Contraseña"
            {...register('password', {
              required: 'Introduzca su contraseña',
            })}
          />
          {errors.password && <p className={styles.formError}>{errors.password.message}</p>}
          <input className={styles.inputRegister}
            type="text"
            placeholder="Teléfono"
            {...register('phone', {
              required: 'Introduzca su teléfono',
            })}
          />
          {errors.phone && <p className={styles.formError}>{errors.phone.message}</p>}
          <input className={styles.inputRegister}
            type="text"
            placeholder="Dirección"
            {...register('address')}
          />
          {errors.address && <p className={styles.formError}>{errors.address.message}</p>}
          <input className={styles.inputRegister}
            type="text"
            placeholder="Foto"
            {...register('photo')}
          />
          {errors.photo && <p className={styles.formError}>{errors.photo.message}</p>}
          <input className={styles.inputRegister}
            type="date"
            placeholder="Fecha de nacimiento"
            {...register('birthday')}
          />
          {errors.birthday && <p className={styles.formError}>{errors.birthday.message}</p>}
          <input className={styles.inputRegister}
            type="text"
            placeholder="Sexo"
            {...register('gender')}
          />
          {errors.gender && <p className={styles.formError}>{errors.gender.message}</p>}
          <button className={styles.createUserButton} type="submit">
            Regístrate
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserPage;
