import React, { useContext } from "react";
import styles from "./modalCompra.module.css";
import stylesDark from "./modalCompraDark.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { postTransactions } from "../../../utils/apiTransacions";
import { updateProduct } from "../../../utils/apiProducts";
import { ThemeContext } from "../../../context/themeContext";

const ModalCompra = ({ modalOpen, setModalOpen, data }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const queryClient = useQueryClient(["transaction"]);
  const queryClientProd = useQueryClient(["product"]);
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
        <div
          className={
            darkMode ? stylesDark.modalContainer : styles.modalContainer
          }
        >
          <div
            className={darkMode ? stylesDark.modalContent : styles.modalContent}
          >
            <div className={darkMode ? stylesDark.foooter : styles.foooter}>
              <h3>Realizando la compra</h3>
              <button
                onClick={handleSubmitClose}
                className={darkMode ? stylesDark.modalClose : styles.modalClose}
              >
                X
              </button>
            </div>
            <div className={darkMode ? stylesDark.form : styles.form}>
              <form className={darkMode ? stylesDark.errors : styles.errors}>
                {/* datos producto */}
                <h4>¿Cómo quieres recibirlo?</h4>
                <h6>
                  Elige el método más conveniente. El coste del servicio se
                  sumará al precio del producto.
                </h6>
                <div
                  className={darkMode ? stylesDark.formUser : styles.formUser}
                >
                  <div className={darkMode ? stylesDark.errors : styles.errors}>
                    <label
                      className={darkMode ? stylesDark.labels : styles.labels}
                    >
                      Direcion de envio
                      <input
                        className={
                          darkMode
                            ? stylesDark.inputProfile
                            : styles.inputProfile
                        }
                        type="text"
                        name="Address"
                        placeholder="Direción donde quieres recibir la compra"
                        {...register("address", {
                          required: "address is required",
                        })}
                      />
                    </label>
                  </div>
                  <div className={darkMode ? stylesDark.error : styles.error}>
                    {errors.address && (
                      <p>
                        <span className="icon-warning1"></span>
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>
                <div
                  className={darkMode ? stylesDark.formUser : styles.formUser}
                >
                  <label
                    className={darkMode ? stylesDark.labels : styles.labels}
                  >
                    Numero tarjeta
                    <input
                      className={
                        darkMode ? stylesDark.inputProfile : styles.inputProfile
                      }
                      type="text"
                      name="Address"
                      placeholder="Numero de tarjeta"
                    />
                  </label>
                </div>
                <div
                  className={darkMode ? stylesDark.formUser : styles.formUser}
                >
                  <label
                    className={darkMode ? stylesDark.labels : styles.labels}
                  >
                    Nombre propietario
                    <input
                      className={
                        darkMode ? stylesDark.inputProfile : styles.inputProfile
                      }
                      type="text"
                      name="Address"
                      placeholder="Nombre del propietario"
                    />
                  </label>
                </div>
                <div className={darkMode ? stylesDark.fecha : styles.fecha}>
                  <div
                    className={darkMode ? stylesDark.formUser : styles.formUser}
                  >
                    <label
                      className={darkMode ? stylesDark.labels : styles.labels}
                    >
                      Caducidad
                      <input
                        className={
                          darkMode
                            ? stylesDark.inputProfile
                            : styles.inputProfile
                        }
                        type="date"
                        name="Address"
                        placeholder="caducidad"
                      />
                    </label>
                  </div>
                  <div
                    className={darkMode ? stylesDark.formUser : styles.formUser}
                  >
                    <label
                      className={darkMode ? stylesDark.labels : styles.labels}
                    >
                      CCV
                      <input
                        className={
                          darkMode
                            ? stylesDark.inputProfile
                            : styles.inputProfile
                        }
                        type="text"
                        name="Address"
                        placeholder="CVV"
                      />
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div
              className={darkMode ? stylesDark.finalCompra : styles.finalCompra}
            >
              <div className={darkMode ? stylesDark.resumen : styles.resumen}>
                <div className={darkMode ? stylesDark.title : styles.title}>
                  <p>{data.title}</p>
                  <p>{data.price} € </p>
                </div>
                <div className={darkMode ? stylesDark.price : styles.price}>
                  <p>Precio envio</p>
                  <p>2.49 €</p>
                </div>
                <p className={darkMode ? stylesDark.total : styles.total}>
                  {total} €
                </p>
              </div>
              <button
                className={darkMode ? stylesDark.comprar : styles.comprar}
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
