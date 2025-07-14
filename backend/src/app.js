const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const generosRoute = require('./routes/generos_api');
const comentariosRoute = require('./routes/comentarios_api');

app.use(cors());
app.use(express.json());


app.get("/api/v1/health", (req, res) => {
  res.json({status: "OK"});
});

//Ruteo de enpoints de generos
app.use('/api/v1/generos', generosRoute);


app.use('/api/v1/comentarios',comentariosRoute);

app.listen(PORT, () => {
  console.log(`Server initiated at port ${PORT}`);
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

