// Creamos las principales funciones con la BD
/*
    ·QUERY --> 
    ·MODEL --> modelSchema de mongo
    ·POPULATIONFIELDS --> si tiene que hacer populate
    ·ENTITY --> 
    
*/

// GET ALL
const findAll = ({ query = {}, model, populationFields = [], entity }) => {
  // comprobamos que exista el model y entity
  if (!model || !entity) {
    throw new Error("Missing Model or Entity");
  }
  //                  ¿¿¿¿find o findAll????
  let operation = model.find(query);
  //   hacemos un foreach para todos los populates que tenga
  if (populationFields.length > 0) {
    populationFields.forEach((popField) => {
      operation = operation.populate(popField);
    });
  }
  return operation;
};

// FIND ONE
const findOne = ({ id, model, populationFields = [], entity }) => {
  if (!model || !entity) {
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

// CREATE
const create = (model, data) => {
  if (!model || !data) {
    throw new Error("Missing Model or data");
  }
  const newEntity = new model(data);
  return newEntity.save();
};

// MODIFICAR / UPDATE
const updateOne = ({ model, id, data, populationFields = [] }) => {
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
const deleteOne = (model, id) => {
  if (!model || !id) {
    throw new Error("Missing Model or ID");
  }
  return model.findByIdAndDelete(id);
};

module.exports = { findAll, findOne, create, deleteOne, updateOne };
