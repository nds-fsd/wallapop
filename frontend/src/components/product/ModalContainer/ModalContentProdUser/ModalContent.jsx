import React from "react";
import EditElse from "../../../EditProducts/EditElse";


const ModalContent = (prod) => {
//   const category = prod.prod.categories
// console.log(category)
 
  return (
    <>
      <h3>Información de tu producto / servicio</h3>
      {/* <div>
        {prod.categories.map((category) => (
          <h5 key={category._id}>{category.title}</h5>
        ))}
      </div> */}
      {prod && <EditElse prod={prod}/>}
      {/* <FormElse /> */}
    </>
  );
};

export default ModalContent;
