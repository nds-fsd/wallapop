import { useQuery } from "react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { getProductByName } from "../../../utils/apiProducts";
import Spinner from "../../Spinner/Spinner";
import Product from "../../product/product/Product";

const ListBuscador = () => {
  const params = useParams();
  //llamo a la funcion getProductByName para poder mostrar la lista de productos
  const { data: products, isLoading } = useQuery(
    ["products", params.name],
    getProductByName
  );
  return (
    <div>
      {isLoading && (
        <div>
          <Spinner size="M" />
        </div>
      )}
      <div>
        <h1>Resultados:</h1>
        {!isLoading &&
          // hago bucle para mostrar todos los productos que me ha llegado de la BD
          products.map((prod) => {
            return (
              // Llamo al componente PRoduct y le paso la info de cada producto
              <Product key={prod.id} prod={prod} />
            );
          })}
      </div>
    </div>
  );
};

export default ListBuscador;
