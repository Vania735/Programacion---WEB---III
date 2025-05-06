import * as Producto from '../model/ProductModel.js';

// Obtener todos los productos
export const obtenerProductos=async(req,res)=>{
    try{
        const personas= await Producto.obtenerTodosProductos();
        res.status(200).json(personas);
    }catch(error){
        res.status(500).json({message:'Error al obtener datos de la Persona',error:error.message});
    }
}

// Crear un nuevo producto
export const crearProducto = async (req, res) => {
    try {
      const { nombre, telefono, puesto } = req.body;
  
      // Validar que los campos estén presentes
      if (!nombre || !telefono || !puesto) {
        return res.status(400).json({ message: 'Nombre, teléfono y puesto son requeridos' });
      }
  
      const newProducto = await Producto.crearNuevoProducto(nombre, telefono, puesto);
      res.status(201).json({ id: newProducto, message: 'Producto creado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al cargar datos de la Persona', error: error.message });
    }
  };
{/* 
export const crearProducto = async(req,res)=>{
    try{
        const {nombre}=req.body;
        const newProducto=await Producto.crearNuevoProducto(nombre);
        res.status(201).json({id:newProducto,message:'Producto creado'});
    }catch(error){
        res.status(500).json({message:'Error al cargar el producto',error:error.message});
    }
}*/}



{/**************************** ACTUALIZAR PERSONA ***************************************************/}
{/*export const ActualizarNuevoProducto=async(req,res)=>{
    try{
        const {id}=req.params;
        const buscar=await Producto.buscarProducto(id);
        if(!buscar) return res.status(404).json({message:'Producto no encontrado'});
        await Producto.ActualizarProducto(id,req.body.nombre);
        res.status(200).json({message:'Producto actualizado correctamente'});
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Error al actualizar el producto',error:error.message});
    }
}*/}

export const ActualizarNuevoProducto = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, telefono, puesto } = req.body;
  
      const buscar = await Producto.buscarProducto(id);
      if (!buscar) return res.status(404).json({ message: 'Persona no encontrado' });
  
      if (!nombre || !telefono || !puesto) {
        return res.status(400).json({ message: 'Nombre, teléfono y puesto son requeridos' });
      }
  
      await Producto.ActualizarProducto(id, nombre, telefono, puesto);
      res.status(200).json({ message: 'Datos actualizado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar los datos', error: error.message });
    }
}

{/**************************** ELIMINAR PERSONA ***********************************/}
export const EliminarProductos=async(req,res)=>{
    try{
        const {id}=req.params;
        const buscar=await Producto.buscarProducto(id);
        if(!buscar) return res.status(404).json({message:'Persona no encontrado'});
        await Producto.EliminarProducto(id);
        res.status(200).json({message:'Persona eliminado correctamente'});

    }catch(error){
        console.error(error);
        res.status(500).json({message:'Error al eliminar a la Persona',error:error.message});
    } 
    
}