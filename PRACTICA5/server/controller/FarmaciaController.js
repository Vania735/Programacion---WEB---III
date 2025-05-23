import *as FarmaciaModel from '../models/FarmaciaModel.js';

export const obtenerObjetos=async(req,res)=>{
    try{
        const autores=await FarmaciaModel.obtenerObjetos();
        res.json(autores);
    }catch(error){
        res.status(500).json({error:error.message})
    }
}
export const Agregar = async (req, res) => {
  try {
    const { nombre, nacionalidad, fecha_nacimiento, biografia } = req.body;

    // Expresiones regulares
    const nombreRegex = /^[a-zA-Z\s]{3,}$/;
    const nacionalidadRegex = /^[a-zA-Z\s]{2,}$/;
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;

    // Validaciones
    if (!nombreRegex.test(nombre)) {
      return res.status(400).json({ error: 'Nombre inválido. Solo letras y espacios, mínimo 3 caracteres.' });
    }

    if (!nacionalidadRegex.test(nacionalidad)) {
      return res.status(400).json({ error: 'Nacionalidad inválida. Solo letras, mínimo 2 caracteres.' });
    }

    if (!fechaRegex.test(fecha_nacimiento)) {
      return res.status(400).json({ error: 'Fecha inválida. Use el formato YYYY-MM-DD.' });
    }

    if (!biografia || biografia.length < 10) {
      return res.status(400).json({ error: 'Biografía muy corta. Mínimo 10 caracteres.' });
    }

    const autor = await FarmaciaModel.AgregarObjetos(nombre, nacionalidad, fecha_nacimiento, biografia);
    res.status(200).json(autor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const ActualizarObjetos=async(req,res)=>{
    try{
        const { id } = req.params;
        const {nombre,nacionalidad,fecha_nacimiento,biografia}=req.body;

        const autores=await FarmaciaModel.Actualizar(id,nombre,nacionalidad,fecha_nacimiento,biografia);
        res.status(200).json(autores);
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

export const EliminarObjetos = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica si tiene libros asociados antes de eliminar
    const libros = await FarmaciaModel.obtenerLibrosPorAutor(id);

    if (libros.length > 0) {
      return res.status(400).json({ mensaje: "Este autor tiene libros registrados y no puede ser eliminado." });
    }

    // Si no tiene libros, se puede eliminar
    await FarmaciaModel.Eliminar(id);
    res.status(200).json({ mensaje: "Autor eliminado correctamente." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al intentar eliminar el autor." });
  }
};

//********************** L I B R O S  ********************** */

export const obtenerLibrosDelAutor = async (req, res) => {
    try {
        const { id } = req.params;
        const libros = await FarmaciaModel.obtenerLibrosPorAutor(id);
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//*************** M O S T R A R ****** L I B R O S *********************** */

export const obtenerTodosLosLibros = async (req, res) => {
    try {
        const libros = await FarmaciaModel.obtenerTodosLosLibros();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};