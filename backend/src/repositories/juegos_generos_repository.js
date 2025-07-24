const dbClient = require('./db_conection.js');

async function addAllJuegoGeneroForJuegoIdAndGenerosArray(juego_id, generos) {
    const values = generos.map(id_genero => `(${juego_id}, ${id_genero})`).join(", ");
    const query = `INSERT INTO juegos_generos (id_juego, id_genero) VALUES ${values} RETURNING *;`; 
    const result = await dbClient.query(query);
    return result.rows;
}

async function deleteAllJuegoGeneroByGeneroId(genero_id) {
    const result = await dbClient.query('DELETE FROM juegos_generos WHERE id_genero = $1', [genero_id]);
    return result.rows;
}

async function deleteAllJuegoGeneroByJuegoId(juego_id) {
    const result = await dbClient.query('DELETE FROM juegos_generos WHERE id_juego = $1', [juego_id]);
    return result.rows;
}

async function deleteAllJuegoGeneroByJuegoIdAndGenerosArray(juego_id, generos) {
    const query = `DELETE FROM juegos_generos WHERE id_juego = ${juego_id} and id_genero = ANY(ARRAY [${generos}]);`;
    const result = await dbClient.query(query);
    return result.rows;
}

module.exports = {
    addAllJuegoGeneroForJuegoIdAndGenerosArray,
    deleteAllJuegoGeneroByGeneroId,
    deleteAllJuegoGeneroByJuegoId,
    deleteAllJuegoGeneroByJuegoIdAndGenerosArray
};
