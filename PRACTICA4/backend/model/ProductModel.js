import pool from "../config/db.js";

// Obtener todos los productos
export const obtenerTodosProductos=async()=>{
    const [array]= await pool.query('SELECT * FROM personas');
    return array;
}

// Crear un nuevo producto con nombre, telefono y puesto
export const crearNuevoProducto = async (nombre, telefono, puesto) => {
    const [resultado] = await pool.query(
      'INSERT INTO personas(nombre, telefono, puesto) VALUES(?, ?, ?)',[nombre, telefono, puesto]);
    return resultado.insertId;
}

  // Actualizar producto completo
export const ActualizarProducto = async (id, nombre, telefono, puesto) => {
    await pool.query('UPDATE personas SET nombre = ?, telefono = ?, puesto = ? WHERE id = ?',
      [nombre, telefono, puesto, id]);
}

// Buscar producto por ID
export const buscarProducto=async(id)=>{
    const [array]=await pool.query('SELECT * FROM personas WHERE id=?',[id]);
    return array[0];
}

// Eliminar producto
export const EliminarProducto=async(id)=>{
    await pool.query('DELETE FROM personas WHERE id = ?', [id]);
}