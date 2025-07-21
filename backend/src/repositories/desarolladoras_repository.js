const dbClient = require('./db_conection.js');
const {
  deleteComentariosByJuegoId
} = require("../repositories/comentarios_repository.js");
const { deleteAllJuegoGeneroByJuegoId } = require('./juegos_generos_repository.js');
const { deleteAllJuegoPlataformaByJuegoId } = require('./juegos_plataformas_repository.js');
const { deleteJuegoById } = require('./juegos_repository.js');
async function getAllDesarrolladoras() {
    const result = await dbClient.query('SELECT * FROM desarrolladoras');
    return result.rows
}
async function getDesarrolladoraById(id){
    const result = await dbClient.query('SELECT * FROM desarrolladoras where id = $1',[id])
    return result.rows[0]
}

async function existsDesarrolladoraById(id) {
    const result = await dbClient.query('SELECT EXISTS (SELECT 1 FROM desarrolladoras WHERE id = $1)', [id]);
    return result.rows[0].exists;
}

async function existsDesarrolladoraByNombre(nombre) {
  const result = await dbClient.query(
    'SELECT nombre FROM desarrolladoras WHERE nombre = ($1)',
    [nombre]
  );
  return result.rows[0];
}
async function addDesarrolladora(data) {
  const { nombre, imagen_url, fecha_fundacion, pais_sede_central, presidente_actual } = data;
  const result = await dbClient.query(
    `INSERT INTO desarrolladoras
       (nombre, imagen_url, fecha_fundacion, pais_sede_central, presidente_actual)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *;`,
    [nombre, imagen_url, fecha_fundacion, pais_sede_central, presidente_actual]
  );
  return result.rows[0];
}


async function updateDesarrolladora(id, data) {
  const { nombre, imagen_url, fecha_fundacion, pais_sede_central, presidente_actual } = data;

  const result = await dbClient.query(
    `UPDATE desarrolladoras
     SET nombre = $1, 
         imagen_url = $2, 
         pais_sede_central = $3, 
         presidente_actual = $4
     WHERE id = $5
     RETURNING *;`, 
    [nombre, imagen_url, pais_sede_central, presidente_actual, id]
  );

  return result.rows[0];
}

async function deleteDesarrolladora(id) {
  const juegos = await dbClient.query('SELECT * FROM juegos where desarrolladora_id = $1',[id])
  let len = juegos.rows.length
  if(len != 0){
    for(let i = 0; i < len;i++){
      console.log(juegos.rows[i])
      deleteAllJuegoGeneroByJuegoId(juegos.rows[i].id)
      deleteAllJuegoPlataformaByJuegoId(juegos.rows[i].id)
      deleteComentariosByJuegoId(juegos.rows[i].id)
      deleteJuegoById(juegos.rows[i].id)
    }
  }
  
  const result = await dbClient.query('DELETE FROM desarrolladoras where id = $1',[id])
  return result.rows;
}
module.exports = {
    getAllDesarrolladoras,
    getDesarrolladoraById,
    existsDesarrolladoraById,
    existsDesarrolladoraByNombre,
    addDesarrolladora,
    updateDesarrolladora,
    deleteDesarrolladora
}