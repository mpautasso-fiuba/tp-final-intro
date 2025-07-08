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


app.get("/", async (req, res) => {
  try {
    const generos = await getAllGeneros();
    res.json(generos);
  } catch (error) {
    console.error("Error en la carga de géneros:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/:id", async (req, res) => {
  let genero_id = req.params.id;
  try {
    const genero = await getGeneroById(genero_id);
    if(genero === undefined) {
      return res.sendStatus(404);
    }
    res.json(genero);
  } catch (error) {
    console.error("Error en la carga de géneros:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/", async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).send("No enviaste un body");
  }  
  const nombre = req.body.nombre.trim();

  if (nombre === undefined || nombre === "") {
    return res.status(400).send("No enviaste 'Nombre'");
  }

  try{
    const alreadyExists = await existsGeneroByNombre(nombre);
    console.log("Ya existe un género con ese nombre.");
    if (alreadyExists) {
      return res.status(409).send("Ya existe un género con ese nombre");
    }
    const result = await agregarGenero(nombre);
    console.log("Género agregado correctamente:", result);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error en la carga de géneros:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/:id", async (req, res) => {
   let genero_id = req.params.id;
  try {
    const genero = await getGeneroById(genero_id);
    if(genero === undefined) {
      return res.sendStatus(404).body("El género no existe");
    }
    const result = await deleteGeneroById(genero_id);
    res.json("Borrado correctamente");
  } catch (error) {
    console.error("Error en la carga de géneros:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/:id", async(req, res) => {
  if (req.body === undefined) {
    return res.status(400).send("No enviaste un body");
  }  
  const genero_id = req.params.id;
  const nombre = req.body.nombre.trim();

  if (nombre === undefined || nombre === "") {
    return res.status(400).send("No enviaste 'Nombre'");
  }

  try{
    const genero = await getGeneroById(genero_id);
    if(genero === undefined) {
      return res.sendStatus(404).body("El género a editar no existe");
    }

    const nombreAlreadyExists = await existsGeneroByNombre(nombre);
    if (nombreAlreadyExists) {
      return res.status(409).send("Ya existe un género con ese nombre");
    }

    const result = await editarGeneroById(genero_id, nombre);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error en la edicion del género:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;