import React from "react";
import HousePage from "./HousePage";
import ElsePage from "./ElsePage";
import VehiclePage from "./VehiclePage";
import Spinner from "../../Spinner/Spinner";
import { useQuery } from "react-query";
import { getProductById } from "../../../utils/apiProducts";
import { useParams } from "react-router-dom";

const ProdPage = () => {
  const params = useParams();

  const { data, isLoading } = useQuery(
    ["product", params.productid],
    getProductById
  );
  const id = params.productid;

  if (!data || !data.category) {
    return null; // Render nothing if data or category is undefined
  }
  const cat = data?.category;

  let componentToRender;

  switch (cat) {
    case "Inmobiliaria":
      componentToRender = <HousePage id={id} />;
      break;
    case "Motos":
    case "Coches":
      componentToRender = <VehiclePage id={id} />;
      break;
    default:
      componentToRender = <ElsePage id={id} />;
      break;
  }

  return (
    <>
      {isLoading && (
        <div>
          <Spinner size="M" />
        </div>
      )}
      {!isLoading && id && componentToRender}
    </>
  );
};

export default ProdPage;
