const express = require("express");
const app = express();

const {
  getAllComentarios,
  getComentarioById,
  getComentariosByJuegoId,
  addComentario,
  updateComentario,
  deleteComentario
} = require("../repositories/comentarios_repository.js");
const dbClient = require("../repositories/db_conection.js");

app.use(express.json());

// btener todos los comentarios
app.get("/", async (req, res) => {
  try {
    const comentarios = await getAllComentarios();
    res.json(comentarios);
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    res.status(500).send("Internal Server Error");
  }
});

// oobtener comentarios por juego_id
app.get("/juego/:juegoId", async (req, res) => {
  const juego_id = req.params.juegoId;
  try {
    const comentarios = await getComentariosByJuegoId(juego_id);
    if (comentarios.length === 0) {
        return res.status(404).send("No se pudo encontrar comentarios en el id del juego solicitado");
    }
    return res.status(200).json(comentarios);
  } catch (error) {
    console.error("Error al obtener comentarios por juego:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Obtenercomentario por ID
app.get("/:id", async (req, res) => {
  const comentario_id = req.params.id;
  try {
    const comentario = await getComentarioById(comentario_id);
    if (comentario === undefined) {
      return res.status(404).send("Comentario no encontrado");
    }
    res.json(comentario);
  } catch (error) {
    console.error("Error al obtener comentario:", error);
    res.status(500).send("Internal Server Error");
  }
});

// agregar comentario
app.post("/", async (req, res) => {
  const {
    usuario,
    juego_id,
    texto,
    fecha_publicacion,
    calificacion,
    horas_jugadas,
    terminado
  } = req.body;

  if (!usuario || !usuario.trim()) {
    return res.status(400).send("Falta el campo 'usuario'");
  }

  if (!juego_id) {
    return res.status(400).send("Falta el campo 'juego_id'");
  }
  
  const result = await dbClient.query('SELECT * FROM juegos where id = $1',[juego_id]);
  if(result.rows[0] === undefined){
    return res.status(404).send("El id del juego no existe")
  }
  if (!texto || !texto.trim()) {
    return res.status(400).send("Falta el campo 'texto'");
  }

  if (calificacion === undefined || calificacion === null) {
    return res.status(400).send("Falta el campo 'calificacion'");
  }

  if (terminado === undefined || terminado === null) {
    return res.status(400).send("Falta el campo 'terminado'");
  }

  try {
    const comentario = await addComentario({
      usuario: usuario.trim(),
      juego_id,
      texto: texto.trim(),
      fecha_publicacion: fecha_publicacion || null,
      calificacion,
      horas_jugadas: horas_jugadas || null,
      terminado
    });

    res.status(201).json(comentario);
  } catch (error) {
    console.error("Error al agregar comentario:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.put("/:id", async (req, res) => {
  const comentario_id = req.params.id;
  const {
    usuario,
    texto,
    fecha_publicacion,
    calificacion,
    horas_jugadas,
    terminado
  } = req.body;

  try {
    const comentarioExistente = await getComentarioById(comentario_id);
    if (!comentarioExistente) {
      return res.status(404).send("Comentario no encontrado");
    }

    const datosActualizados = {
      usuario: usuario?.trim() || comentarioExistente.usuario,
      texto: texto?.trim() || comentarioExistente.texto,
      fecha_publicacion: fecha_publicacion || comentarioExistente.fecha_publicacion,
      calificacion: calificacion !== undefined ? calificacion : comentarioExistente.calificacion,
      horas_jugadas: horas_jugadas !== undefined ? horas_jugadas : comentarioExistente.horas_jugadas,
      terminado: terminado !== undefined ? terminado : comentarioExistente.terminado
    };

    const resultado = await updateComentario(comentario_id, datosActualizados);
    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al actualizar comentario:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Eliminar comentario
app.delete("/:id", async (req, res) => {
  const comentario_id = req.params.id;
  try {
    const comentarioExistente = await getComentarioById(comentario_id);
    if (comentarioExistente === undefined) {
      return res.status(404).send("Comentario no encontrado");
    }

    await deleteComentario(comentario_id);
    res.status(200).json(comentarioExistente);
  } catch (error) {
    console.error("Error al eliminar comentario:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;