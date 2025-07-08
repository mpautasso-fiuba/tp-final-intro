const dbClient = require('./db_conection.js');

async function getAllGeneros() {
    const result = await dbClient.query('SELECT * FROM generos');
    return result.rows;
}

async function getGeneroById(id) {
    const result = await dbClient.query('SELECT * FROM generos WHERE id = $1', [id]);
    return result.rows;
}

async function existsGeneroByNombre(nombre) {
    const result = await dbClient.query('SELECT EXISTS (SELECT 1 FROM generos WHERE nombre = $1)', [nombre]);
    return result.rows[0].exists;
}

async function agregarGenero(nombre) {
    const result = await dbClient.query('INSERT INTO generos (nombre) VALUES($1) RETURNING *', [nombre]);
    return result.rows[0];
}

async function editarGeneroById(id, nombre) {
    const result = await dbClient.query('UPDATE generos SET nombre = $1 WHERE id = $2 RETURNING *', [nombre, id]);
    return result.rows[0];
}

async function deleteGeneroById(id) {
    const result = await dbClient.query('DELETE FROM generos WHERE id = $1', [id]);
    return result.rows;
}

module.exports = {
    getAllGeneros,
    getGeneroById,
    existsGeneroByNombre,
    agregarGenero,
    editarGeneroById,
    deleteGeneroById
};
