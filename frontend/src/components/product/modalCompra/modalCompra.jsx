import React from "react";
import styles from "./modalCompra.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { postTransactions } from "../../../utils/apiTransacions";
import { updateProduct } from "../../../utils/apiProducts";

const ModalCompra = ({ modalOpen, setModalOpen, data }) => {
  const queryClient = useQueryClient(["transaction"]);
  const queryClientProd = useQueryClient(["product"]);

  // console.log("eee que tal por el modal de la compra?");
  const idProduct = data._id;
  const prod = data;
  if (!modalOpen) {
    return null; // Si el modal no está abierto, no se muestra nada
  }
  const total = Number(data.price) + 2.49;
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
      queryClientProd.setQueryData(["product", prod]);
    },
  });

  const handleSubmitWrapperUpdate = (data) => {
    const dataProd = new Date();
    // crear transacion
    const transactionData = { ...data, product: idProduct, date: dataProd };
    mutation.mutate(transactionData);

    // modificar producto
    const productnData = { ...prod, sold: true };
    mutationProd.mutate(productnData);
    // a la que se crea la transacion se borran todos los datos del form
    reset();
    setModalOpen(false);
    alert("La compra se ha completado correctamente");
  };

  const handleSubmitClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <div className={styles.foooter}>
              <p>Realizando la compra</p>
              <button onClick={handleSubmitClose} className={styles.modalClose}>
                Cerrar
              </button>
            </div>
            <div className={styles.form}>
              <form className={styles.errors}>
                {/* datos producto */}
                <h4>¿Cómo quieres recibirlo?</h4>
                <h6>
                  Elige el método más conveniente. El coste del servicio se
                  sumará al precio del producto.
                </h6>
                <div className={styles.formUser}>
                  <div className={styles.errors}>
                    <label className={styles.labels}>
                      Direcion de envio
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
                    Numero tarjeta
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
            </div>
            <div className={styles.finalCompra}>
              <div className={styles.resumen}>
                <div className={styles.title}>
                  <p>{data.title}</p>
                  <p>{data.price} € </p>
                </div>
                <div className={styles.price}>
                  <p>Precio envio</p>
                  <p>2.49 €</p>
                </div>
                <p className={styles.total}>{total} €</p>
              </div>
              <button
                className={styles.comprar}
                type="submit"
                onClick={handleSubmit(handleSubmitWrapperUpdate)}
              >
                Confirmar compra
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCompra;
