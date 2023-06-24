import React, { useContext, useState } from "react";
import styles from "./modalCompra.module.css";
import { useForm } from "react-hook-form";
import { postTransactions } from "../../../utils/apiTransacions";
import { updateProduct } from "../../../utils/apiProducts";
import { useNavigate } from "react-router-dom";
import style from "../ProductPage//productPage.module.css";

const ModalCompra = ({ modalOpen, setModalOpen, data }) => {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const idProduct = data._id;
  const prod = data;
  const total = Number(data.price) + 2.49;

  if (!modalOpen) {
    return null; // Si el modal no está abierto, no se muestra nada
  }
  if (!data.price) {
    data = data[0].products[0];
  }

  const handleSubmitWrapperUpdate = async (data) => {
    console.log(data);
    const dataProd = new Date();
    const transactionData = { ...data, product: idProduct, date: dataProd };
    const productnData = { ...prod, sold: true };
    // modificar producto
    try {
      const productSold = await updateProduct(productnData);
      setShowAlert(!showAlert);
      // crear transacion
      const newTransaction = await postTransactions(transactionData);

      // a la que se crea la transacion se borran todos los datos del form
      
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmitClose = () => {
    setModalOpen(false);
  };

  const handleAlertAccept = () => {
    setShowAlert(false);
    navigate("/user/purchases");
  };

  return (
    <>
      {data && showAlert && (
        <div className={style.alert}>
          <p>La compra se ha completado correctamente</p>
          <button onClick={handleAlertAccept} className={style.accept}>
            Aceptar
          </button>
        </div>
      )}
      {modalOpen && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <div className={styles.foooter}>
              <h3>Realizando la compra</h3>
              <button onClick={handleSubmitClose} className={styles.modalClose}>
                X
              </button>
            </div>
            <div className={styles.form}>
              <form
                className={styles.errors}
                onSubmit={handleSubmit(handleSubmitWrapperUpdate)}
              >
                {/* datos producto */}
                <h4>¿Cómo quieres recibirlo?</h4>
                <h6>
                  Elige el método más conveniente. El coste del servicio se
                  sumará al precio del producto.
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

                <div className={styles.finalCompra}>
                  <div className={styles.resumen}>
                    <div className={styles.title}>
                      <p>{data.title}</p>
                      <p>{data.price} € </p>
                    </div>
                    <div className={styles.price}>
                      <p>Precio envío</p>
                      <p>2.49 €</p>
                    </div>
                    <p className={styles.total}>{total} €</p>
                  </div>
                  <button className={styles.comprar} type="submit">
                    Confirmar compra
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCompra;
