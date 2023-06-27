// Creamos las principales funciones
/*
    ·QUERY --> 
    ·MODEL --> modelSchema de mongo
    ·POPULATIONFIELDS --> si tiene que hacer populate
    ·ENTITY --> 
    
*/
const { findAll, create, findOne } = require("./bd-service");

// GET ALL
const getAll = ({ model, populationFields, entity }) => {
  const result = async (req, res) => {
    try {
      // llamamos a la funcion finsAll (bd-service) y le pasamos los datos
      const allItems = await findAll({
        query: req.query,
        populationFields,
        entity,
        model,
      });
      res.status(200).json(allItems);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  };
  return result;
};

// GET ONE
const getOne = ({ model, populationFields }) => {
  const result = async (req, res) => {
    try {
      const selected = await findOne({
        id: ewq.params.id,
        model,
        populationFields,
      });
      res.status(200).json(selected);
    } catch (e) {
      res.status(500).json({ message: e });
    }
  };
  return result;
};

// CREAR | NEW | CREATE
const createOne = ({ model, requiredKeys = [] }) => {
  const result = async (req, res) => {
    const data = req.body;

    // miramos que haya los datos necesarios
    if (requiredKeys.length > 0) {
      let missingKeys = [];
      //   se comprueba si las 'requiredKeys' existen en el modelo y estan bien , si es asi los añade en hasMissingKeys
      const hasMissingKeys = requiredKeys.reduce((prev, current) => {
        if (Boolean(data[current])) {
          return prev;
        } else {
          missingKeys.push(current);
          return prev + 1;
        }
      }, 0);

      if (Boolean(hasMissingKeys)) {
        return res
          .status(400)
          .json({ message: `missing keys: ${missingKeys.join(", ")}` });
      }
    }
    const newItem = await create(model, data);
    return res.json(newItem);
  };
  return result;
};

// UPDATE | MODIFICAR
const updateOne = ({ model, populationFields }) => {
  const result = async (req, res) => {
    const filter = req.params.id;
    console.log("FILTERS::", filter);
    const selectedItem = await updateItem({
      model,
      id: req.params.id,
      data: req.body,
      populationFields,
    });
    res.json(selectedItem);
  };
  return result;
};

// DELETE
const deleteOne = (model) => {
  const result = async (req, res) => {
    const deletedItem = await deletedItem(model, req.params.id);
    res.json(deletedItem);
  };
  return result;
};

module.exports = {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
