const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const generosRoute = require('./routes/generos_api');
const comentariosRoute = require('./routes/comentarios_api');
const desarrolladorasRoute = require('./routes/desarrolladoras_api');
const plataformasRoute = require('./routes/plataformas_api');
const juegosRoute = require('./routes/juegos_api');

app.use(cors());
app.use(express.json());


app.get("/api/v1/health", (req, res) => {
  res.json({status: "OK"});
});

app.use('/api/v1/generos', generosRoute);

app.use('/api/v1/desarrolladoras', desarrolladorasRoute);

app.use('/api/v1/comentarios',comentariosRoute);

app.use('/api/v1/plataformas', plataformasRoute);

app.use('/api/v1/juegos', juegosRoute);


app.listen(PORT, () => {
  console.log(`Server initiated at port ${PORT}`);
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

