const dbClient = require('./db_conection.js');

async function deleteAllJuegoPlataformaByPlataformaId(plataforma_id) {
    const result = await dbClient.query('DELETE FROM juegos_plataformas WHERE id_plataforma = $1', [plataforma_id]);
    return result.rows;
}

async function deleteAllJuegoPlataformaByJuegoId(juego_id) {
    const result = await dbClient.query('DELETE FROM juegos_plataformas WHERE id_juego = $1', [juego_id]);
    return result.rows;
}

module.exports = {
    deleteAllJuegoPlataformaByPlataformaId,
    deleteAllJuegoPlataformaByJuegoId
};
