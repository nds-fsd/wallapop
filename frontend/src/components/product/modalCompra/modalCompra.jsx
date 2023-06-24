import React, { useContext } from "react";
import styles from "./modalCompra.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { postTransactions } from "../../../utils/apiTransacions";
import { updateProduct } from "../../../utils/apiProducts";
import { useNavigate } from "react-router-dom";

const ModalCompra = (prod) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(["transaction"]);
  const queryClientProd = useQueryClient(["product"]);

  if (!prod.price) {
    prod = prod.prod;
  }
  const idProduct = prod._id;
  const total = Number(prod.price) + 2.49;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // creamos la transacion
  const mutation = useMutation(postTransactions, {
    onSuccess: () => {
      queryClient.invalidateQueries(["transaction"]);
    },
  });

  // modificamos el producto para cambiarle el sold a true (linia 47)
  const mutationProd = useMutation(updateProduct, {
    onSuccess: () => {
      queryClientProd.setQueryprod(["product", prod]);
    },
  });

  const handleSubmitWrapperUpdate = (prod) => {
    const prodProd = new Date();
    // crear transacion
    const transactionprod = { ...prod, product: idProduct, date: prodProd };
    mutation.mutate(transactionprod);

    // modificar producto
    const productnprod = { ...prod, sold: true };
    mutationProd.mutate(productnprod);
    // a la que se crea la transacion se borran todos los datos del form
    reset();
    alert("La compra se ha completado correctamente");
    navigate("/");
  };

  return (
    <>
      <form className={styles.errors}>
        {/* datos producto */}
        <h4>¿Cómo quieres recibirlo?</h4>
        <h6>
          Elige el método más conveniente. El coste del servicio se sumará al
          precio del producto.
        </h6>
        <div className={styles.formUser}>
          <div className={styles.errors}>
            <label className={styles.labels}>
              Dirección de envío
              <input
                className={styles.inputProfile}
                type="text"
                name="Address"
                placeholder="Direción donde quieres recibir la compra"
                {...register("address", {
                  required: "address is required",
                })}
              />
            </label>
          </div>
          <div className={styles.error}>
            {errors.address && (
              <p>
                <span className="icon-warning1"></span>
                {errors.address.message}
              </p>
            )}
          </div>
        </div>
        <div className={styles.formUser}>
          <label className={styles.labels}>
            Número tarjeta
            <input
              className={styles.inputProfile}
              type="text"
              name="Address"
              placeholder="Numero de tarjeta"
            />
          </label>
        </div>
        <div className={styles.formUser}>
          <label className={styles.labels}>
            Nombre propietario
            <input
              className={styles.inputProfile}
              type="text"
              name="Address"
              placeholder="Nombre del propietario"
            />
          </label>
        </div>
        <div className={styles.fecha}>
          <div className={styles.formUser}>
            <label className={styles.labels}>
              Caducidad
              <input
                className={styles.inputProfile}
                type="date"
                name="Address"
                placeholder="caducidad"
              />
            </label>
          </div>
          <div className={styles.formUser}>
            <label className={styles.labels}>
              CCV
              <input
                className={styles.inputProfile}
                type="text"
                name="Address"
                placeholder="CVV"
              />
            </label>
          </div>
        </div>
      </form>
      <div className={styles.finalCompra}>
        <div className={styles.resumen}>
          <div className={styles.title}>
            <p>{prod.title}</p>
            <p>{prod.price} € </p>
          </div>
          <div className={styles.price}>
            <p>Precio envío</p>
            <p>2.49 €</p>
          </div>
          <p className={styles.total}>{total} €</p>
        </div>
        <button
          className={styles.comprar}
          type="submit"
          onClick={handleSubmitWrapperUpdate}
        >
          Confirmar compra
        </button>
      </div>
    </>
  );
};

export default ModalCompra;
