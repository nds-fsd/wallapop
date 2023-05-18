import React from "react";
import EditElse from "../../../EditProducts/EditElse";


const ModalContent = ({id}) => {


 
  return (
    <>
      <h3>Información de tu producto / servicio</h3>
      {/* <div>
        {prod.categories.map((category) => (
          <h5 key={category._id}>{category.title}</h5>
        ))}
      </div> */}
      {id && <EditElse id={id}/>}
      {/* <FormElse /> */}
    </>
  );
};

export default ModalContent;
