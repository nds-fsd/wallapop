import React from "react";
import { useForm } from "react-hook-form";
import styles from "./createUser.module.css";
import { setUserSession } from "../../utils/localStorage.utils";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { createUser } from "../../utils/apiAuth";

const CreateUserPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const registerUser = useMutation(["user"], createUser);

  const handleCreateUser = (data) => {
    registerUser.mutate(data, {
      onSuccess: (data) => {
        setUserSession(data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      },
    });
    reset()
  };

  console.log(errors)

  // const handleCreateUser = async (userData) => {
  //   try {
  //     const response = await api.post("/user/register", userData);
  //     if (response.status === 201) {
  //       setUserSession(response.data.token);
  //       localStorage.setItem("user", JSON.stringify(response.data.user));
  //     }
  //     return response;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // };

  return (
    <>
      <div className={styles.createUserContainer}>
        <h1>Regístrate</h1>
        <form
          onSubmit={handleSubmit(handleCreateUser)}
          className={styles.formContainer}
        >
          <div className={styles.column}>
            <input
              type="text"
              placeholder="Nombre"
              className={styles.input}
              {...register("name", {
                required: "Nombre obligatorio",
              })}
            />
            <input
              type="text"
              placeholder="Apellido"
              className={styles.input}
              {...register("surname", {
                required: "Apellido obligatorio",
              })}
            />
                        
          </div>
          <div className={styles.error}> 
            {errors.name && <p><span className="icon-warning1"></span>{errors.name.message}</p>}
            {errors.surname && <p><span className="icon-warning1"></span>{errors.surname.message}</p>}
          </div>
          <div className={styles.column}>
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              {...register("email", {
                required: "Email obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Email no válido",
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
          <div className={styles.error1}>
            {errors.email && <p><span className="icon-warning1"></span>{errors.email.message}</p>}
            {errors.password && <p><span className="icon-warning1"></span>{errors.password.message}</p>}
          </div>
          <div className={styles.column}>
            <input
              type="text"
              placeholder="Teléfono"
              className={styles.input}
              {...register("phone", {
                required: "Teléfono obligatorio",
              })}
            />
            <input
              type="text"
              placeholder="Dirección"
              className={styles.input}
              {...register("address", {required: "Dirección obligatoria"})}
            />
          </div>
          <div className={styles.error}>
            {errors.phone && <p><span className="icon-warning1"></span>{errors.phone.message}</p>}
            {errors.address && <p><span className="icon-warning1"></span>{errors.address.message}</p>}

          </div>
          <div className={styles.column}>
            <input
              type="date"
              placeholder="Fecha de nacimiento"
              className={styles.input}
              {...register("birthday")}
            />
            {errors.birthday && <p className={styles.error}><span className="icon-warning1"></span>{errors.birthday.message}</p>}
            <select
              {...register("gender")}
              placeholder="Género"
              className={styles.dropdown}
            >
              <option value="">Selecciona una opción</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="No binario">Binario</option>
              <option value="Prefiero no decirlo">Prefiero no decirlo</option>
            </select>
            {errors.gender && <p className={styles.error}><span className="icon-warning1"></span>{errors.gender.message}</p>}
          </div>
          {/* <input
              type="text"
              placeholder="Imágenes"
              className={styles.input}
              {...register('photo')}
            /> */}
          <div className={styles.column}>
            <div className={styles.imageColumn}>
              <label htmlFor="images">Selecciona una imagen</label>
              <button className={styles.image}>
                <span className="icon-image1"></span>
              </button>
            </div>
            {errors.photo && <p className={styles.error}><span className="icon-warning1"></span>{errors.photo.message}</p>}

            <button className={styles.createUserButton} type="submit">
              Regístrate
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateUserPage;
