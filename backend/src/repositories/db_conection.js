const {Pool} = require('pg');

const dbClient = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'videojuegos',
    user: 'postgres',
    password: 'postgres'
})

module.exports = dbClient;