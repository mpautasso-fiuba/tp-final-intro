const dbClient = require('./db_conection.js');

async function getAllComentarios() {
  const result = await dbClient.query(
    'SELECT c.*, j.nombre as juego_nombre FROM comentarios c, juegos j WHERE c.juego_id = j.id'
  );
  return result.rows;
}

async function getComentarioById(id) {
  const result = await dbClient.query(
    'SELECT * FROM comentarios WHERE id = $1',
    [id]
  );
  return result.rows[0];
}
async function getAllJuegosWithComentariosCount(){
  const results = await dbClient.query(
    `SELECT 
      j.id AS juego_id,
      j.nombre AS juego_nombre,
      COUNT(c.id) AS cantidad_comentarios
    FROM juegos j
    LEFT JOIN comentarios c ON c.juego_id = j.id
    GROUP BY j.id
      `
  );
  if (results.rows.length == 0) {
        return undefined;
  }
  return results.rows;
}
async function getComentariosByJuegoId(juegoId) {
  const result = await dbClient.query(
    `SELECT 
      c.*, 
      j.nombre AS juego_nombre 
    FROM 
      comentarios c
    JOIN 
      juegos j ON c.juego_id = j.id
    WHERE 
      c.juego_id = $1;`,
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
    calificacion,
    horas_jugadas,
    terminado
  } = data;

  const result = await dbClient.query(
    `UPDATE comentarios
     SET usuario = $1,
         texto = $2,
         calificacion = $3,
         horas_jugadas = $4,
         terminado = $5
     WHERE id = $6
     RETURNING *;`,
    [usuario, texto, calificacion, horas_jugadas, terminado, id]
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

async function deleteComentariosByJuegoId(id_juego){
  const result = await dbClient.query(
    'DELETE FROM comentarios where juego_id = $1 RETURNING *;',[id_juego]
  );
  return result.rows;
}

module.exports = {
  getAllComentarios,
  getComentarioById,
  getComentariosByJuegoId,
  getAllJuegosWithComentariosCount,
  addComentario,
  updateComentario,
  deleteComentario,
  deleteComentariosByJuegoId
};