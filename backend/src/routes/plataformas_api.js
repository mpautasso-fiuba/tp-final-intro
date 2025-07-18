const express = require("express");
const app = express();
const {
    getAllPlataformas,
    getPlataformaById,
    existsPlataformaByNombre,
    agregarPlataforma,
    editarPlataformaById,
    deletePlataformaById
} = require("../repositories/plataformas_repository.js");
const { deleteAllJuegoPlataformaByPlataformaId } = require('../repositories/juegos_plataformas_repository.js');

app.use(express.json());

//GET - '/api/v1/plataformas'
app.get("/", async (req, res) => {
  try {
    const plataformas = await getAllPlataformas();
    res.json(plataformas);
  } catch (error) {
    console.error("Error en la carga de plataformas:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//GET - '/api/v1/plataformas/:id'
app.get("/:id", async (req, res) => {
  let plataforma_id = req.params.id;
  try {
    const plataforma = await getPlataformaById(plataforma_id);
    if(plataforma === undefined) {
      return res.status(404).json({ message: "La plataforma no existe"});
    }
    res.json(plataforma);
  } catch (error) {
    console.error("Error en la carga de plataforma:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//POST - '/api/v1/plataformas'
app.post("/", async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).json({ message: "No enviaste un body"});
  }  
  const nombre = req.body.nombre.trim();

  if (nombre === undefined || nombre === "") {
    return res.status(400).json({ message: "No enviaste 'nombre'"});
  }

  try{
    const alreadyExists = await existsPlataformaByNombre(nombre);
    console.log("Ya existe una plataforma con ese nombre.");
    if (alreadyExists) {
      return res.status(409).json({ message: "Ya existe una plataforma con ese nombre"});
    }
    const result = await agregarPlataforma(nombre);
    console.log("Plataforma agregada correctamente:", result);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error en la carga de plataformas:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//DELETE - '/api/v1/plataformas/:id'
app.delete("/:id", async (req, res) => {
   let plataforma_id = req.params.id;
  try {
    const plataforma = await getPlataformaById(plataforma_id);
    if(plataforma === undefined) {
      return res.status(404).json({ message: "La plataforma no existe"});
    }
    const resultDeleteReferences = await deleteAllJuegoPlataformaByPlataformaId(plataforma_id);

    const result = await deletePlataformaById(plataforma_id);
    res.json("Borrada correctamente");
  } catch (error) {
    console.error("Error en la carga de plataformas:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//PUT - '/api/v1/plataformas/:id'
app.put("/:id", async(req, res) => {
  if (req.body === undefined) {
    return res.status(400).json({ message: "No enviaste un body"});
  }  
  const plataforma_id = req.params.id;
  const nombre = req.body.nombre.trim();

  if (nombre === undefined || nombre === "") {
    return res.status(400).json({ message: "No enviaste 'nombre'"});
  }

  try{
    const genero = await getPlataformaById(plataforma_id);
    if(genero === undefined) {
      return res.status(404).json({ message: "La plataforma a editar no existe"});
    }

    const nombreAlreadyExists = await existsPlataformaByNombre(nombre);
    if (nombreAlreadyExists) {
      return res.status(409).json({ message: "Ya existe una plataforma con ese nombre"});
    }

    const result = await editarPlataformaById(plataforma_id, nombre);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error en la edicion de la plataforma:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = app;