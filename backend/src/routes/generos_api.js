const express = require("express");
const app = express();
const {
    getAllGeneros,
    getGeneroById,
    existsGeneroByNombre,
    agregarGenero,
    editarGeneroById,
    deleteGeneroById
} = require("../repositories/generos_repository.js");

app.use(express.json());

//GET - '/api/v1/generos'
app.get("/", async (req, res) => {
  try {
    const generos = await getAllGeneros();
    res.json(generos);
  } catch (error) {
    console.error("Error en la carga de géneros:", error);
    res.status(500).json({ message: "Internal Server Error"});
  }
});

//GET - '/api/v1/generos/:id'
app.get("/:id", async (req, res) => {
  let genero_id = req.params.id;
  try {
    const genero = await getGeneroById(genero_id);
    if(genero === undefined) {
      return res.status(404).json({ message: "El género no existe"});
    }
    res.json(genero);
  } catch (error) {
    console.error("Error en la carga de géneros:", error);
    res.status(500).json({ message: "Internal Server Error"});
  }
});

//POST - '/api/v1/generos'
app.post("/", async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).json({ message: "No enviaste un body"});
  }  
  const nombre = req.body.nombre.trim();

  if (nombre === undefined || nombre === "") {
    return res.status(400).json({ message: "No enviaste 'nombre'"});
  }

  try{
    const alreadyExists = await existsGeneroByNombre(nombre);
    if (alreadyExists) {
      return res.status(409).json({ message: "Ya existe un género con ese nombre"});
    }
    const result = await agregarGenero(nombre);
    console.log("Género agregado correctamente:", result);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error en la carga de géneros:", error);
    res.status(500).json({ message: "Internal Server Error"});
  }
});

//DELETE - '/api/v1/generos/:id'
app.delete("/:id", async (req, res) => {
   let genero_id = req.params.id;
  try {
    const genero = await getGeneroById(genero_id);
    if(genero === undefined) {
      return res.status(404).json({ message: "El género no existe"});
    }
    const result = await deleteGeneroById(genero_id);
    res.json("Borrado correctamente");
  } catch (error) {
    console.error("Error en la carga de géneros:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//PUT - '/api/v1/generos/:id'
app.put("/:id", async(req, res) => {
  if (req.body === undefined) {
    return res.status(400).json({ message: "No enviaste un body"});
  }  
  const genero_id = req.params.id;
  const nombre = req.body.nombre.trim();

  if (nombre === undefined || nombre === "") {
    return res.status(400).json({ message: "No enviaste 'nombre'"});
  }

  try{
    const genero = await getGeneroById(genero_id);
    if(genero === undefined) {
      return res.sendStatus(404).json({ message: "El género a editar no existe"});
    }

    const nombreAlreadyExists = await existsGeneroByNombre(nombre);
    if (nombreAlreadyExists) {
      return res.status(409).json({ message: "Ya existe un género con ese nombre"});
    }

    const result = await editarGeneroById(genero_id, nombre);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error en la edicion del género:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = app;