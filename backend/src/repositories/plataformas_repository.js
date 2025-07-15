const dbClient = require('./db_conection.js');

async function getAllPlataformas() {
    const result = await dbClient.query('SELECT * FROM plataformas');
    return result.rows;
}

async function getPlataformaById(id) {
    const result = await dbClient.query('SELECT * FROM plataformas WHERE id = $1', [id]);
    if (result.rows.length == 0) {
        return undefined;
    }
    return result.rows[0];
}

async function existsPlataformaByNombre(nombre) {
    const result = await dbClient.query('SELECT EXISTS (SELECT 1 FROM plataformas WHERE nombre = $1)', [nombre]);
    return result.rows[0].exists;
}

async function agregarPlataforma(nombre) {
    const result = await dbClient.query('INSERT INTO plataformas (nombre) VALUES($1) RETURNING *', [nombre]);
    return result.rows[0];
}

async function editarPlataformaById(id, nombre) {
    const result = await dbClient.query('UPDATE plataformas SET nombre = $1 WHERE id = $2 RETURNING *', [nombre, id]);
    return result.rows[0];
}

async function deletePlataformaById(id) {
    const result = await dbClient.query('DELETE FROM plataformas WHERE id = $1', [id]);
    return result.rows;
}

module.exports = {
    getAllPlataformas,
    getPlataformaById,
    existsPlataformaByNombre,
    agregarPlataforma,
    editarPlataformaById,
    deletePlataformaById
};
