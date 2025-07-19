const dbClient = require('./db_conection.js');

async function getAllJuegos() {
    const result = await dbClient.query(
        `SELECT 
            j.id,
            j.nombre,
            j.descripcion,
            j.precio_usd,
            j.imagen_url,
            j.fecha_publicacion,
            j.web_oficial,
            j.pegi,
            j.puntaje_metacritic,
            d.nombre AS desarrolladora,
            j.promedio_calificacion,
            array_agg(DISTINCT p.nombre ORDER BY p.nombre) AS plataformas,
            array_agg(DISTINCT g.nombre ORDER BY g.nombre) AS generos
        FROM (
            SELECT 
                juego.*,
                AVG(c.calificacion) AS promedio_calificacion
            FROM juegos juego
            LEFT JOIN comentarios c ON juego.id = c.juego_id
            GROUP BY juego.id
        ) j
        LEFT JOIN desarrolladoras d ON j.desarrolladora_id = d.id
        LEFT JOIN juegos_plataformas jp ON j.id = jp.id_juego
        LEFT JOIN plataformas p ON jp.id_plataforma = p.id
        LEFT JOIN juegos_generos jg ON j.id = jg.id_juego
        LEFT JOIN generos g ON jg.id_genero = g.id
        GROUP BY j.id, j.nombre, j.descripcion, j.precio_usd, j.imagen_url, j.fecha_publicacion,
                j.web_oficial, j.pegi, j.puntaje_metacritic, j.desarrolladora_id, j.promedio_calificacion, d.nombre`);
    return result.rows;
}

async function getJuegoById(id) {
    const result = await dbClient.query(
        `SELECT 
            j.id,
            j.nombre,
            j.descripcion,
            j.precio_usd,
            j.imagen_url,
            j.fecha_publicacion,
            j.web_oficial,
            j.pegi,
            j.puntaje_metacritic,
            d.nombre AS desarrolladora,
            j.promedio_calificacion,
            array_agg(DISTINCT p.nombre ORDER BY p.nombre) AS plataformas,
            array_agg(DISTINCT g.nombre ORDER BY g.nombre) AS generos
        FROM (
            SELECT 
                juego.*,
                AVG(c.calificacion) AS promedio_calificacion
            FROM juegos juego
            LEFT JOIN comentarios c ON juego.id = c.juego_id
            WHERE juego.id = $1
            GROUP BY juego.id
        ) j
        LEFT JOIN desarrolladoras d ON j.desarrolladora_id = d.id
        LEFT JOIN juegos_plataformas jp ON j.id = jp.id_juego
        LEFT JOIN plataformas p ON jp.id_plataforma = p.id
        LEFT JOIN juegos_generos jg ON j.id = jg.id_juego
        LEFT JOIN generos g ON jg.id_genero = g.id
        GROUP BY j.id, j.nombre, j.descripcion, j.precio_usd, j.imagen_url, j.fecha_publicacion,
                j.web_oficial, j.pegi, j.puntaje_metacritic, j.desarrolladora_id, j.promedio_calificacion, d.nombre`,
        [id]);
    if (result.rows.length == 0) {
        return undefined;
    }
    return result.rows[0];
}

async function getJuegoToUpdateById(id) {
    const result = await dbClient.query(
        `SELECT 
            j.id,
            j.nombre,
            j.descripcion,
            j.precio_usd,
            j.imagen_url,
            j.fecha_publicacion,
            j.web_oficial,
            j.pegi,
            j.puntaje_metacritic,
            d.nombre AS desarrolladora,
            d.id AS desarrolladora_id,
            p.nombre AS plataforma_nombre,
            p.id AS plataforma_id,
            g.nombre AS genero_nombre,
            g.id AS genero_id
        FROM juegos j
        LEFT JOIN desarrolladoras d ON j.desarrolladora_id = d.id
        LEFT JOIN juegos_plataformas jp ON j.id = jp.id_juego
        LEFT JOIN plataformas p ON jp.id_plataforma = p.id
        LEFT JOIN juegos_generos jg ON j.id = jg.id_juego
        LEFT JOIN generos g ON jg.id_genero = g.id
        where j.id = $1`,
        [id]);
    if (result.rows.length == 0) {
        return undefined;
    }
    return result.rows;
}

async function existsJuegoById(id) {
    const result = await dbClient.query('SELECT EXISTS (SELECT 1 FROM juegos WHERE id = $1)', [id]);
    return result.rows[0].exists;
}

async function existsJuegoByNombre(nombre) {
    const result = await dbClient.query('SELECT EXISTS (SELECT 1 FROM juegos WHERE nombre = $1)', [nombre]);
    return result.rows[0].exists;
}

async function addJuego(data) {
    const { nombre, descripcion, precio_usd, imagen_url, fecha_publicacion, web_oficial,
        pegi, puntaje_metacritic, desarrolladora_id } = data;
    console.log("Datos del juego a agregar:", data);
    const result = await dbClient.query(
    `INSERT INTO juegos
        (nombre, descripcion, precio_usd, imagen_url, fecha_publicacion, web_oficial,
            pegi, puntaje_metacritic, desarrolladora_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;`,
    [nombre, descripcion, precio_usd, imagen_url, fecha_publicacion, web_oficial,
        pegi, puntaje_metacritic, desarrolladora_id]
    );
    return result.rows[0];
}

async function updateJuegoById(id, data) {
    console.log("Datos del juego a actualizar:", data);
    const { nombre, descripcion, precio_usd, imagen_url, fecha_publicacion, web_oficial,
        pegi, puntaje_metacritic, desarrolladora_id } = data;
    const result = await dbClient.query(
    `UPDATE juegos
     SET nombre = $1, 
        descripcion = $2, 
        precio_usd = $3, 
        imagen_url = $4, 
        fecha_publicacion = $5,
        web_oficial = $6,
        pegi = $7,
        puntaje_metacritic = $8,
        desarrolladora_id = $9
     WHERE id = $10
     RETURNING *;`, 
    [nombre, descripcion, precio_usd, imagen_url, fecha_publicacion, web_oficial,
        pegi, puntaje_metacritic, desarrolladora_id, id]);
    return result.rows[0];
}

async function deleteJuegoById(id) {
    const result = await dbClient.query('DELETE FROM juegos WHERE id = $1', [id]);
    return result.rows;
}

module.exports = {
    getAllJuegos,
    getJuegoById,
    getJuegoToUpdateById,
    existsJuegoById,
    existsJuegoByNombre,
    addJuego,
    updateJuegoById,
    deleteJuegoById
};
