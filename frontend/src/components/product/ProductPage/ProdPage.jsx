import React from "react";
import styles from "./productPage.module.css";
import HousePage from "./HousePage";
import ElsePage from "./ElsePage";
import VehiclePage from "./VehiclePage";
import Spinner from "../../Spinner/Spinner";
import { useQuery } from "react-query";
import { getProductByIdHarcodedHouse } from "../../../utils/apiProducts";

const ProdPage = () => {
  const id = "644ebe60f1b76b31b761b446";
  // const id = "644796a9d7f98ce14c6ec067"

  // const {data, isLoading} = useQuery(['product', id], getProductById)
  const { data: category, isLoading } = useQuery(
    ["product", id],
    getProductByIdHarcodedHouse
  );

  let componentToRender;

  if (category === "Inmobiliaria") {
    componentToRender = <HousePage />;
  } else if (category === "Motos" || "Coches") {
    componentToRender = <VehiclePage />;
  } else {
    componentToRender = <ElsePage />;
  }

  return (
    <>
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}
      {!isLoading && <div>{componentToRender}</div>}
    </>
  );
};

export default ProdPage;
