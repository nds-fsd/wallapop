import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './createUser.module.css';
import { setUserSession } from '../../utils/localStorage.utils';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';

const CreateUserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateUser = async (userData) => {
    try {
      const response = await api.post("/user/register", userData);
      if (response.status === 201) {
        setUserSession(response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className={styles.createUserContainer}>
      <div className={styles.formContainer}>
        <h1>Regístrate</h1>
        <form onSubmit={handleSubmit(handleCreateUser)}>
          <input
            type="text"
            placeholder="Name"
            {...register('name', {
              required: 'Name is required',
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
          <input
            type="text"
            placeholder="Surname"
            {...register('surname', {
              required: 'Surname is required',
            })}
          />
          {errors.surname && <p>{errors.surname.message}</p>}
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
          />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <input
            type="text"
            placeholder="Phone"
            {...register('phone', {
              required: 'Phone is required',
            })}
          />
          {errors.phone && <p>{errors.phone.message}</p>}
          <input
            type="text"
            placeholder="Address"
            {...register('address')}
          />
          {errors.address && <p>{errors.address.message}</p>}
          <input
            type="text"
            placeholder="Photo"
            {...register('photo')}
          />
          {errors.photo && <p>{errors.photo.message}</p>}
          <input
            type="date"
            placeholder="Birthday"
            {...register('birthday')}
          />
          {errors.birthday && <p>{errors.birthday.message}</p>}
          <input
            type="text"
            placeholder="Gender"
            {...register('gender')}
          />
          {errors.gender && <p>{errors.gender.message}</p>}
          <Link to="/"><button className={styles.createUserButton} type="submit">
            Regístrate
          </button></Link>
        </form>
      </div>
    </div>
  );
};

export default CreateUserPage;
