import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../utils/apiProducts";

const ProductPublished = () => {
  //Aqui va el fetch al endpoint de productos

    //para coger el id de la url
    // const params = useParams();
    // const { data, isLoading } = useQuery(
    //   ["product", params.productid],
    //   getProductById
    // );

  return <h1>AQUI VA LA PAGINA DE PRODUCTOS PUBLICADOS</h1>;
};

export default ProductPublished;
