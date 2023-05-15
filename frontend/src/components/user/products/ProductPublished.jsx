import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductByUser } from "../../../utils/apiProducts";
import Spinner from "../../Spinner/Spinner";

const ProductPublished = (product) => {
  //Aqui va el fetch al endpoint de productos

    // para coger el id de la url
    // const id = "6460c2f2980f4e977122dc3c"
    // const { id } = useParams();
    // const { data, isLoading } = useQuery(
    //   ["products/published", id],
    //   () => getProductByUser(id)
    // );
    // console.log("products for user", data)
    // console.log(id)


    const { data, isLoading } = useQuery(
      ["products/published"],
      getProductByUser
    );
    console.log("los productos del user", data)
    



  return  (
    <>
      {/* {isLoading && (
        <div>
          <Spinner />
        </div>
      )} */}

      {/* {!isLoading && (
        <div>

        </div>
      )} */}

      <h1>AQUI VA LA PAGINA DE PRODUCTOS PUBLICADOS</h1>





    </>

  )


};

export default ProductPublished;
