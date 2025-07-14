const dbClient = require('./db_conection.js');

async function getAllComentarios() {
  const result = await dbClient.query('SELECT * FROM comentarios');
  return result.rows;
}

async function getComentarioById(id) {
  const result = await dbClient.query(
    'SELECT * FROM comentarios WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

async function getComentariosByJuegoId(juegoId) {
  const result = await dbClient.query(
    'SELECT * FROM comentarios WHERE juego_id = $1',
    [juegoId]
  );
  return result.rows;
}

async function addComentario(data) {
  const {
    usuario,
    juego_id,
    texto,
    fecha_publicacion,
    calificacion,
    horas_jugadas,
    terminado
  } = data;

  const result = await dbClient.query(
    `INSERT INTO comentarios
     (usuario, juego_id, texto, fecha_publicacion, calificacion, horas_jugadas, terminado)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *;`,
    [usuario, juego_id, texto, fecha_publicacion, calificacion, horas_jugadas, terminado]
  );

  return result.rows[0];
}

async function updateComentario(id, data) {
  const {
    usuario,
    texto,
    fecha_publicacion,
    calificacion,
    horas_jugadas,
    terminado
  } = data;

  const result = await dbClient.query(
    `UPDATE comentarios
     SET usuario = $1,
         texto = $2,
         fecha_publicacion = $3,
         calificacion = $4,
         horas_jugadas = $5,
         terminado = $6
     WHERE id = $7
     RETURNING *;`,
    [usuario, texto, fecha_publicacion, calificacion, horas_jugadas, terminado, id]
  );

  return result.rows[0];
}

async function deleteComentario(id) {
  const result = await dbClient.query(
    'DELETE FROM comentarios WHERE id = $1 RETURNING *;',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  getAllComentarios,
  getComentarioById,
  getComentariosByJuegoId,
  addComentario,
  updateComentario,
  deleteComentario
};