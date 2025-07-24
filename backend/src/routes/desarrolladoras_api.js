const express = require("express");
const app = express();
const {
    getAllDesarrolladoras,
    getDesarrolladoraById,
    existsDesarrolladoraByNombre,
    addDesarrolladora,
    updateDesarrolladora,
    deleteDesarrolladora,
    getDesarrolladoraWithDetails
} = require("../repositories/desarolladoras_repository.js");

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const desarrolladoras = await getAllDesarrolladoras();
    res.json(desarrolladoras);
  } catch (error) {
    console.error("Error en la carga de desarrolladoras:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/:id", async(req, res) => {
  let desarrolladora_id = req.params.id;
  try{
    const desarrolladora = await getDesarrolladoraById(desarrolladora_id);
    if(desarrolladora === undefined){
      return res.status(404).json({ message: "Desarrolladora no encontrada" });
    }
    res.json(desarrolladora);
  }
  catch (error){
    console.error("Error en la carga de desarrolladoras:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/:id/details", async(req, res) => {
  let desarrolladora_id = req.params.id;
  try{
    const desarrolladora = await getDesarrolladoraWithDetails(desarrolladora_id);
    if(desarrolladora === undefined){
      return res.status(404).json({ message: "Desarrolladora no encontrada" });
    }
    res.json(desarrolladora);
  }
  catch (error){
    console.error("Error en la carga de desarrolladoras:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
function esFechaValida(fecha) {
    const hoy = new Date();
    const fechaIngresada = new Date(fecha);
    return fechaIngresada <= hoy;
}

app.post("/", async (req, res) => {
  const { nombre, 
          imagen_url, 
          fecha_fundacion, 
          pais_sede_central, 
          presidente_actual } = req.body;

  if (!nombre || !nombre.trim()) {
    return res.status(400).json({ message: "Falta el campo 'nombre'" });
  }

  if (!pais_sede_central || !pais_sede_central.trim()) {
    return res.status(400).json({ message: "Falta el campo 'pais_sede_central'" });
  }

  if (!presidente_actual || !presidente_actual.trim()) {
    return res.status(400).json({ message: "Falta el campo 'presidente_actual'" });
  }
  if (!esFechaValida(req.body.fecha_fundacion)) {
    return res.status(400).json({ error:"La fecha de fundación es invalida"}); 
  }
  try {
    const alreadyExists = await existsDesarrolladoraByNombre(nombre.trim());
    if (alreadyExists) {
      return res.status(409).json({ message: "Ya existe una desarrolladora con ese nombre" });
    }

    const result = await addDesarrolladora({
      nombre: nombre.trim(),
      imagen_url: imagen_url?.trim() || null,
      fecha_fundacion: fecha_fundacion || null,
      pais_sede_central: pais_sede_central.trim(),
      presidente_actual: presidente_actual.trim()
    });
    
    res.status(201).json(result);
  } catch (error) {
    console.error("Error al agregar desarrolladora:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.put("/:id", async (req, res) => {
  const desarrolladora_id = req.params.id;
  const {
    nombre,
    imagen_url,
    pais_sede_central,
    presidente_actual
  } = req.body;
  try {
    const desarrolladoraExistente = await getDesarrolladoraById(desarrolladora_id);
    if (!desarrolladoraExistente) {
      return res.status(404).json({ message: "Desarrolladora no encontrada" });
    }
    const datosActualizados = {
      nombre: nombre?.trim() || desarrolladoraExistente.nombre,
      imagen_url: imagen_url?.trim() || desarrolladoraExistente.imagen_url,
      pais_sede_central: pais_sede_central?.trim() || desarrolladoraExistente.pais_sede_central,
      presidente_actual: presidente_actual?.trim() || desarrolladoraExistente.presidente_actual
    };
    const result = await updateDesarrolladora(desarrolladora_id, datosActualizados);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error al actualizar desarrolladora:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/:id", async (req, res) => {
  let desarrolladora_id = req.params.id;
  try {
    const desarrolladora_existente = await getDesarrolladoraById(desarrolladora_id);
    if (desarrolladora_existente === undefined) {
      return res.status(404).json({ message: "Desarrolladora no encontrada" });
    }
    await deleteDesarrolladora(desarrolladora_id);

    res.status(200).json({ message: "Desarrolladora eliminada correctamente", data: desarrolladora_existente });
  } catch (error) {
    console.error("Error al eliminar desarrolladora:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = app;