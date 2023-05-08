import React, { useState } from "react";
import { useForm } from "react-hook-form";
//import { useQuery } from "react-query";
import { postProduct } from "../utils/api";
import styles from "./Form.module.css";
import icono1 from "../images/pikachu.png";
import icono2 from "../images/miaomiao.png";

const Postproform = () => {
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit } = useForm();
  //const { data, isLoading } = useQuery(["product"], postProduct);

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
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <label htmlFor="">
            <p>Título</p>
            <select {...register('genere')}>
              <option value="sr">Sr.</option>
              <option value="sra">Sra.</option>
              <option value="srta">Srta.</option>
              <option value="agenero">Agénero</option>
            </select>
          </label>
          <label>
            <p>Descripción del propducto</p>
            <input placeholder='Describe el producto aquí' maxLength={50} {...register('description')}></input>
          </label>
          <label>
            <p>Price</p>
            <input type="number" {...register('precio')}></input>
          </label>
          <label>
            <p>Sube imagenes de tu producto aquí</p>
            <input type='submit' value='Sube tus imágenes'></input>
          </label>
        </form>
      )}
    </div>
  );
};
export default Postproform;
