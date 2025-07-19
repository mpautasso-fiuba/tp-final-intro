const express = require("express");
const app = express();
const pegiList = [3, 7, 12, 16, 18];
const {existsDesarrolladoraById} = require("../repositories/desarolladoras_repository.js");
const { addAllJuegoGeneroForJuegoIdAndGenerosArray, 
  deleteAllJuegoGeneroByJuegoId,
  deleteAllJuegoGeneroByJuegoIdAndGenerosArray } = require('../repositories/juegos_generos_repository.js');

const { addAllJuegoPlataformaForJuegoIdAndPlataformasArray, 
  deleteAllJuegoPlataformaByJuegoId, 
  deleteAllJuegoPlataformaByJuegoIdAndPlataformasArray } = require('../repositories/juegos_plataformas_repository.js');

const { deleteComentariosByJuegoId } = require('../repositories/comentarios_repository.js');
const {
    getAllJuegos,
    getJuegoById,
    getJuegoToUpdateById,
    existsJuegoById,
    existsJuegoByNombre,
    addJuego,
    updateJuegoById,
    deleteJuegoById
} = require("../repositories/juegos_repository.js");

app.use(express.json());

//GET - '/api/v1/juegos'
app.get("/", async (req, res) => {
  try {
    const juegos = await getAllJuegos();
    res.json(juegos);
  } catch (error) {
    console.error("Error en la carga de juegos:", error);
    res.status(500).json({ message: "Internal Server Error"});
  }
});

//GET - '/api/v1/juegos/:id'
app.get("/:id", async (req, res) => {
  let juego_id = req.params.id;
  try {
    const juego = await getJuegoById(juego_id);
    if(juego === undefined) {
      return res.status(404).json({ message: "El juego no existe"});
    }
    res.json(juego);
  } catch (error) {
    console.error("Error en la carga de juego:", error);
    res.status(500).json({ message: "Internal Server Error"});
  }
});

//POST - '/api/v1/juegos'
app.post("/", async (req, res) => {
  const { nombre, descripcion, precio_usd, imagen_url, fecha_publicacion, web_oficial,
        pegi, puntaje_metacritic, desarrolladora_id, generos, plataformas } = req.body;

  if (!nombre || !nombre.trim()) {
    return res.status(400).json({ message: "Falta el campo 'nombre'"});
  }

  if (!descripcion || !descripcion.trim()) {
    return res.status(400).json({ message: "Falta el campo 'descripcion'"});
  }

  if (!precio_usd) {
    return res.status(400).json({ message: "Falta el campo 'precio_usd'"});
  } else if (isNaN(precio_usd) || parseFloat(precio_usd) < 0) {
    return res.status(400).json({ message: "El campo 'precio_usd' debe ser un número positivo"});
  }

  if (!web_oficial || !web_oficial.trim()) {
    return res.status(400).json({ message: "Falta el campo 'web_oficial'"});
  }

  if (!pegi) {
    return res.status(400).json({ message: "Falta el campo 'pegi'"});
  } else if (isNaN(pegi) || !pegiList.includes(parseInt(pegi))) {
    return res.status(400).json({ message: "El campo 'pegi' debe ser valor numérico válido"});
  }

  if (!puntaje_metacritic) {
    return res.status(400).json({ message: "Falta el campo 'puntaje_metacritic'"});
  } else if (isNaN(puntaje_metacritic) || parseInt(puntaje_metacritic) < 0 || parseInt(puntaje_metacritic) > 100) {
    return res.status(400).json({ message: "El campo 'puntaje_metacritic' debe ser un número positivo entre 0 y 100"});
  }


  try{
    const alreadyExists = await existsJuegoByNombre(nombre);
    if (alreadyExists) {
      return res.status(409).json({ message: "Ya existe un juego con ese nombre"});
    }

    const desarrolladoraExists = await existsDesarrolladoraById(desarrolladora_id);
    if (!desarrolladoraExists) {
      return res.status(404).json({ message: "La desarrolladora no existe"});
    }

    const result = await addJuego({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio_usd: parseFloat(precio_usd),
      imagen_url: imagen_url?.trim() || null,
      fecha_publicacion: fecha_publicacion,
      web_oficial: web_oficial.trim(),
      pegi: parseInt(pegi),
      puntaje_metacritic: parseInt(puntaje_metacritic),
      desarrolladora_id: desarrolladora_id
    });
    console.log("Juego agregado correctamente:", result);

    //Agregamos las plataformas y géneros asociados
    await addAllGenerosForJuegoId(result.id, generos);
    await addAllPlataformasForJuegoId(result.id, plataformas);

    res.status(201).json(result);
  } catch (error) {
    console.error("Error en el agregado del juego:", error);
    res.status(500).json({ message: "Internal Server Error"});
  }
});

//DELETE - '/api/v1/juegos/:id'
app.delete("/:id", async (req, res) => {
   let juego_id = req.params.id;
  try {
    const genero = await existsJuegoById(juego_id);
    if(genero === undefined) {
      return res.status(404).json({ message: "El género no existe"});
    }    
    const resultDeleteGeneroReferences = await deleteAllJuegoGeneroByJuegoId(juego_id);
    const resultDeletePlataformasReferences = await deleteAllJuegoPlataformaByJuegoId(juego_id);
    const resultDeleteComentariosReferences = await deleteComentariosByJuegoId(juego_id);

    const result = await deleteJuegoById(juego_id);
    res.json("Borrado correctamente");
  } catch (error) {
    console.error("Error en el borrado del juego:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//PUT - '/api/v1/juegos/:id'
app.put("/:id", async(req, res) => {
  const { nombre, descripcion, precio_usd, imagen_url, fecha_publicacion, web_oficial,
        pegi, puntaje_metacritic, desarrolladora_id, generos, plataformas } = req.body;
  
  let juego_id = req.params.id;

  if (!nombre || !nombre.trim()) {
    return res.status(400).json({ message: "Falta el campo 'nombre'"});
  }

  if (!descripcion || !descripcion.trim()) {
    return res.status(400).json({ message: "Falta el campo 'descripcion'"});
  }

  if (!precio_usd) {
    return res.status(400).json({ message: "Falta el campo 'precio_usd'"});
  } else if (isNaN(precio_usd) || parseFloat(precio_usd) < 0) {
    return res.status(400).json({ message: "El campo 'precio_usd' debe ser un número positivo"});
  }

  if (!web_oficial || !web_oficial.trim()) {
    return res.status(400).json({ message: "Falta el campo 'web_oficial'"});
  }

  if (!pegi) {
    return res.status(400).json({ message: "Falta el campo 'pegi'"});
  } else if (isNaN(pegi) || !pegiList.includes(parseInt(pegi))) {
    return res.status(400).json({ message: "El campo 'pegi' debe ser valor numérico válido"});
  }

  if (!puntaje_metacritic) {
    return res.status(400).json({ message: "Falta el campo 'puntaje_metacritic'"});
  } else if (isNaN(puntaje_metacritic) || parseInt(puntaje_metacritic) < 0 || parseInt(puntaje_metacritic) > 100) {
    return res.status(400).json({ message: "El campo 'puntaje_metacritic' debe ser un número positivo entre 0 y 100"});
  }


  try{
    const old_juego = await getJuegoWithPlataformasAndGeneros(juego_id);
    if(old_juego === undefined) {
      return res.sendStatus(404).json({ message: "El juego a editar no existe"});
    }

    if(old_juego.nombre !== nombre.trim()) {
      const alreadyExists = await existsJuegoByNombre(nombre);
      if (alreadyExists) {
        return res.status(409).json({ message: "Ya existe un juego con ese nombre"});
      }
    }

    if (desarrolladora_id !== old_juego.desarrolladora_id) {
      const desarrolladoraExists = await existsDesarrolladoraById(desarrolladora_id);
      if (!desarrolladoraExists) {
        return res.status(404).json({ message: "La desarrolladora no existe"});
      }
    }

    const result = await updateJuegoById(juego_id, {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio_usd: parseFloat(precio_usd),
      imagen_url: imagen_url?.trim() || null,
      fecha_publicacion: fecha_publicacion,
      web_oficial: web_oficial.trim(),
      pegi: parseInt(pegi),
      puntaje_metacritic: parseInt(puntaje_metacritic),
      desarrolladora_id: desarrolladora_id
    });
    console.log("Juego actualizado correctamente:", result);

    await updateGenerosAndPlataformasForJuegoId(juego_id, generos ?? [], plataformas ?? [], old_juego);

    res.status(201).json(result);
  } catch (error) {
    console.error("Error en el agregado del juego:", error);
    res.status(500).json({ message: "Internal Server Error"});
  }
});


async function updateGenerosAndPlataformasForJuegoId(juego_id, generos, plataformas, old_juego) {
  //Borramos las plataformas y géneros asociados
  const generos_to_delete = old_juego.generos.map(g => g.id).filter(g => !generos.includes(g));
  const plataformas_to_delete = old_juego.plataformas.map(p => p.id).filter(p => !plataformas.includes(p));
  if (generos_to_delete.length > 0) {
    await deleteAllJuegoGeneroByJuegoIdAndGenerosArray(juego_id, generos_to_delete);
  }
  if (plataformas_to_delete.length > 0) {
    await deleteAllJuegoPlataformaByJuegoIdAndPlataformasArray(juego_id, plataformas_to_delete);
  }

  //Agregamos las plataformas y géneros asociados
  const generos_to_add = generos.filter(g => !old_juego.generos.some(og => og.id === g));
  const plataformas_to_add = plataformas.filter(p => !old_juego.plataformas.some(op => op.id === p));
  if (generos_to_add.length > 0) {
    await addAllJuegoGeneroForJuegoIdAndGenerosArray(juego_id, generos_to_add);
  }
  if (plataformas_to_add.length > 0) {
    await addAllJuegoPlataformaForJuegoIdAndPlataformasArray(juego_id, plataformas_to_add);
  }
  console.log("Géneros y plataformas actualizados correctamente para el juego:", juego_id);
}

async function addAllGenerosForJuegoId(juego_id, generos) {
  let result_generos = [];
  if (generos && Array.isArray(generos)) {      
    let generos_filtrados = generos.filter(g => (!isNaN(g) || parseInt(g) < 0));
    if (generos_filtrados.length > 0) {
      result_generos = await addAllJuegoGeneroForJuegoIdAndGenerosArray(juego_id, generos_filtrados);
      console.log("Géneros asociados correctamente:", result_generos);
    }
  }
  return result_generos;
}

async function addAllPlataformasForJuegoId(juego_id, plataformas) {
  let result_plataformas = [];
  if (plataformas && Array.isArray(plataformas)) {
    let plataformas_filtradas = plataformas.filter(p => (!isNaN(p) || parseInt(p) < 0));
    if (plataformas.length > 0) {
      result_plataformas = await addAllJuegoPlataformaForJuegoIdAndPlataformasArray(juego_id, plataformas_filtradas);
      console.log("Plataformas asociadas correctamente:", result_plataformas);
    }
  }
  return result_plataformas;
}

async function getJuegoWithPlataformasAndGeneros(juego_id) {
  const array_of_juego = await getJuegoToUpdateById(juego_id);
  if (!array_of_juego) {
    return undefined;
  }
  
  const generos = [...new Map(
      array_of_juego
        .filter(j => j.genero_id && j.genero_nombre)
        .map(j => [j.genero_id, { id: j.genero_id, nombre: j.genero_nombre }])
    ).values()];
  console.log("Géneros del juego:", generos);

  const plataformas = [
    ...new Map(
      array_of_juego
        .filter(j => j.plataforma_id && j.plataforma_nombre)
        .map(j => [j.plataforma_id, { id: j.plataforma_id, nombre: j.plataforma_nombre }])
    ).values()
  ];
  console.log("Plataformas del juego:", plataformas);
  
  return {
    id: array_of_juego[0].id,
    nombre: array_of_juego[0].nombre,
    descripcion: array_of_juego[0].descripcion,
    precio_usd: array_of_juego[0].precio_usd,
    imagen_url: array_of_juego[0].imagen_url,
    fecha_publicacion: array_of_juego[0].fecha_publicacion,
    web_oficial: array_of_juego[0].web_oficial,
    pegi: array_of_juego[0].pegi,
    puntaje_metacritic: array_of_juego[0].puntaje_metacritic,
    desarrolladora: array_of_juego[0].desarrolladora,
    desarrolladora_id: array_of_juego[0].desarrolladora_id,
    generos: generos || [],
    plataformas: plataformas || []
  };
}

module.exports = app;