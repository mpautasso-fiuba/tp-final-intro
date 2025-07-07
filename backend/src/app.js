const express = require('express');
const { Pool } = require('pg');

const app = express();

const PORT = process.env.PORT || 3000;

const pool = new Pool({
  host: 'postgres',      
  user: 'postgres',      
  password: 'postgres', 
  database: 'tp_final_intro_db',  
  port: 5432,
});


app.use(express.json());


app.get('/', (req, res) => {
  res.send('¡Hola mundo!!!!');
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

