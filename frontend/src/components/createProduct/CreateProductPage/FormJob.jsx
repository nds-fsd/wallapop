import React, { useState } from "react";
import styles from "./createProductPage.module.css";
import { useForm } from "react-hook-form";
import { postProduct } from "../../../utils/apiProducts";
import { useMutation, useQueryClient } from "react-query";
import FormImages from "../FormImages/FormImages";
import Map from "../map/Map";

const FormJob = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const mutation = useMutation(postProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const onSubmit = (productData) => {
    mutation.mutate(productData);
    reset()
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.sectionForm}>
        <div className={styles.title}>
          <h2>Información del servicio / empleo</h2>
          <div className={styles.line}></div>
        </div>
        <label htmlFor="title" className={styles.labels}>
          ¿Qué ofreces?
        </label>
        <input
          placeholder="Dale un título a tu servicio / empleo"
          {...register("title", {
            required: {message: "El título es obligatorio"} 
          })}
          className={styles.input}
        ></input>
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
        <div className={styles.labelDouble}>
          <label htmlFor="price" className={styles.labels}>
            Ponle precio
          </label>
          <label htmlFor="keywords" className={styles.labelKeywords}>
            Keywords
          </label>
        </div>
        <div className={styles.price}>
          <input
            type="number"
            min="1"
            {...register("price", {required: "El precio es obligatorio" })}
            placeholder="No te excedas..."
            className={styles.inputPrice}
          ></input>
          <div className={styles.coin}>EUR</div>
          {errors.price && <p className={styles.error}>{errors.price.message}</p>}
          <input
            placeholder="Crea tus palabras clave"
            {...register("keywords")}
            className={styles.inputKeywords}
          ></input>
        </div>
        <div className={styles.labelDouble}>
          <label htmlFor="category" className={styles.labels}>
            Categoría
          </label>
          <label htmlFor="status" className={styles.labelStatus}>
            Estado de tu servicio
          </label>
        </div>
        <div className={styles.column}>
          <select {...register("category", {required: {message: "Selecciona una categoría"} })} className={styles.dropdown}>
            <option value="">Selecciona una categoría</option>
            <option value="Servicios">Servicios</option>
            <option value="Empleo">Empleo</option>
          </select>
          {errors.category && <p className={styles.error}>{errors.category.message}</p>}
          <select {...register("status")} className={styles.dropdown}>
            <option value="">Selecciona un estado</option>
            <option value="Horas a convenir">Horas a convenir</option>
            <option value="Por la mañana">Por la mañana</option>
            <option value="Por la tarde">Por la tarde</option>
          </select>
        </div>
        <label htmlFor="description" className={styles.labels}>
          ¿Cómo es tu producto?
        </label>
        <textarea
          maxLength={500}
          placeholder="Describe las ventajas del servicio o empleo que buscas para que los demás sepan por qué deben contratarte a ti y no a otro..."
          {...register("description", {required: {message: "La descripción es obligatoria"} })}
          className={styles.textArea}
        ></textarea>
        {errors.description && <p className={styles.error}>{errors.description.message}</p>}
        <FormImages />
        <Map />
          <button type="submit" className={styles.formButton} >
            Subir
          </button>
      </form>
    </>
  );
};

export default FormJob;
