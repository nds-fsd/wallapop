import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Form.module.css";
import icono1 from "../images/pikachu.png";
import icono2 from "../images/miaomiao.png";

const Postproform = () => {
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit } = useForm();

  const showProductForm = () => {
    setShowForm(!showForm);
  };

  const onSubmit = async (newProduct) => {
    return api
      .post("products/newProduct", newProduct)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <img
        className={styles.icono}
        src={icono1}
        alt="Cosas que me gustan"
        width={80}
        height={80}
        onClick={showProductForm}
      />
      <img
        className={styles.icono}
        src={icono2}
        alt="Cosas que no me gustan"
        width={80}
        height={80}
        onClick={showProductForm}
      />
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="">
            Título
            <input type="text" {...register("title")} />
          </label>
        </form>
      )}
    </div>
  );
};
export default Postproform;
