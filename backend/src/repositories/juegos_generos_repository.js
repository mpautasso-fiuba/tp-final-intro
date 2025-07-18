const dbClient = require('./db_conection.js');

async function deleteAllJuegoGeneroByGeneroId(genero_id) {
    const result = await dbClient.query('DELETE FROM juegos_generos WHERE id_genero = $1', [genero_id]);
    return result.rows;
}

async function deleteAllJuegoGeneroByJuegoId(juego_id) {
    const result = await dbClient.query('DELETE FROM juegos_generos WHERE id_juego = $1', [juego_id]);
    return result.rows;
}

module.exports = {
    deleteAllJuegoGeneroByGeneroId,
    deleteAllJuegoGeneroByJuegoId
};
