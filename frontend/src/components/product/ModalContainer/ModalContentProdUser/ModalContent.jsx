import React from "react";
import EditElse from "../../../EditProducts/EditElse";
import { useQuery } from "react-query";
import { getProductById } from "../../../../utils/apiProducts";
import EditJob from "../../../EditProducts/EditJob";
import EditVehicle from "../../../EditProducts/EditVehicle";
import EditHouse from "../../../EditProducts/EditHouse";


const ModalContent = ({id}) => {

  // console.log("el id en el modal content", id)

  const { data } = useQuery(["product", id], getProductById)
  console.log("en el modal content", data)

  // const cat= data.category
  // console.log("las keywords", data.category)
  //aqui me retorna la categoria del producto, cuando hago click 
  //en un producto me sale error de que category es undefined
  //y ya no puedo aplicar el switch case

  // let componentToRender;

  // switch (cat) {
  //   case "Inmobiliaria":
  //     componentToRender = <EditHouse />;
  //     break;
  //   case "Motos":
  //   case "Coches":
  //     componentToRender = <EditVehicle />;
  //     break;
  //   case "Servicios":
  //   case "Empleo":
  //     componentToRender = <EditJob />;
  //     break;
  //   default:
  //     componentToRender = <EditElse />;
  //     break;
  // }
 
  return (
    <>
      <h3>Información de tu producto / servicio</h3>
      {id && <EditElse id={id}/>}
      {/* {id && <EditJob id={id}/>} */}
      {/* {id && <EditVehicle id={id}/>} */}
      {/* {id && <EditHouse id={id}/>} */}
      {/* {id && <componentToRender/>} */}


      
    </>
  );
};

export default ModalContent;
