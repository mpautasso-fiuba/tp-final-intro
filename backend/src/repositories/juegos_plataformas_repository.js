const dbClient = require('./db_conection.js');

async function addAllJuegoPlataformaForJuegoIdAndPlataformasArray(juego_id, plataformas) {
    const values = plataformas.map(plataforma_id => `(${juego_id}, ${plataforma_id})`).join(", ");
    const query = `INSERT INTO juegos_plataformas (id_juego, id_plataforma) VALUES ${values} RETURNING *;`; 
    const result = await dbClient.query(query);
    return result.rows;
}

async function deleteAllJuegoPlataformaByPlataformaId(plataforma_id) {
    const result = await dbClient.query('DELETE FROM juegos_plataformas WHERE id_plataforma = $1', [plataforma_id]);
    return result.rows;
}

async function deleteAllJuegoPlataformaByJuegoId(juego_id) {
    const result = await dbClient.query('DELETE FROM juegos_plataformas WHERE id_juego = $1', [juego_id]);
    return result.rows;
}

async function deleteAllJuegoPlataformaByJuegoIdAndPlataformasArray(juego_id, plataformas) {
    const query = `DELETE FROM juegos_plataformas WHERE id_juego = ${juego_id} and id_plataforma = ANY(ARRAY [${plataformas}]);`;
    const result = await dbClient.query(query);
    return result.rows;
}

module.exports = {
    addAllJuegoPlataformaForJuegoIdAndPlataformasArray,
    deleteAllJuegoPlataformaByPlataformaId,
    deleteAllJuegoPlataformaByJuegoId,
    deleteAllJuegoPlataformaByJuegoIdAndPlataformasArray
};
