// Creamos las principales funciones con la BD
/*
    ·QUERY --> lo que quieras buscar
    ·MODEL --> modelSchema de mongo
    ·POPULATIONFIELDS --> si tiene que hacer populate
    ·ENTITY --> 
    
*/

// GET ALL
const findAll = ({
  query = {},
  model,
  populationFields = [],
  entity,
  sort = "",
}) => {
  // comprobamos que exista el model y entity
  if (!model || !entity) {
    throw new Error("Missing Model or Entity");
  }
  let operation = model.find(query);
  //   hacemos un foreach para todos los populates que tenga
  if (populationFields.length > 0) {
    populationFields.forEach((popField) => {
      operation = operation.populate(popField);
    });
  }
  if (sort != "") {
    operation = operation.sort(sort);
  }
  // console.log("OPERTION", operation);
  return operation;
};

// FIND ID
const findID = ({ id, model, populationFields = [] }) => {
  // aqui falta el entity que nose perque va aqui
  if (!model) {
    throw new Error("Missing Model or Entity");
  }
  let operation = model.findById(id);
  if (populationFields.length > 0) {
    populationFields.forEach((popField) => {
      operation = operation.populate(popField);
    });
  }
  return operation;
};

// CREATE | POST
const create = (model, data) => {
  if (!model || !data) {
    throw new Error("Missing Model or data");
  }
  const newEntity = new model(data);
  return newEntity.save();
};

// MODIFICAR / UPDATE
const updateItem = ({ model, id, data, populationFields = [] }) => {
  if (!model || !data || !id) {
    throw new Error("Missing Model or data or id");
  }

  let operation = model.findByIdAndUpdate(id, data, { new: true });
  if (populationFields.length > 0) {
    populationFields.forEach((popField) => {
      operation = operation.populate(popField);
    });
  }
  return operation;
};

// DELETE
const deleteItem = ({ model }, id) => {
  if (!model || !id) {
    throw new Error("Missing Model or ID");
  }
  return model.findByIdAndDelete(id).exec();
};

module.exports = { findAll, findID, create, deleteItem, updateItem };
