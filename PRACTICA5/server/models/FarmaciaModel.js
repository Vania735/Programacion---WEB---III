import pool from "../config/db.js";

export const obtenerObjetos=async()=>{
    const [autores]=await pool.query('SELECT * FROM autor')
    return autores;
}
export const AgregarObjetos=async(nombre,nacionalidad,fecha_nacimiento,biografia)=>{
    const [autores]=await pool.query('INSERT INTO autor(nombre,nacionalidad,fecha_nacimiento,biografia) Value(?,?,?,?)',[nombre,nacionalidad,fecha_nacimiento,biografia]);
    return{id:autores.insertId,nombre,nacionalidad,fecha_nacimiento,biografia}
}   
export const Actualizar = async(id, nombre, nacionalidad, fecha_nacimiento, biografia) => {
    await pool.query('UPDATE autor SET nombre = ?,nacionalidad = ?,fecha_nacimiento = ?,biografia = ? WHERE id_autor = ?',[nombre, nacionalidad, fecha_nacimiento, biografia, id]);
    return {message: 'Se actualizo correctamente' };
}
//export const Eliminar = async(id) => {
//    await pool.query('DELETE FROM autor WHERE id_autor = ?',[id]);
//    return {message: 'Se elimino correctamente' };
//}
export const Eliminar = async (id_autor) => {
    // Verificar si el autor tiene libros
    const [libros] = await pool.query('SELECT * FROM libros WHERE id_autor = ?', [id_autor]);
    if (libros.length > 0) {
        throw new Error('No se puede eliminar el autor porque tiene libros asociados');
    }

    // Si no tiene libros, lo elimina
    await pool.query('DELETE FROM autor WHERE id_autor = ?', [id_autor]);
    return { message: 'Se eliminó correctamente' };
};
//********************************  L I B R O S ********** */

export const obtenerLibrosPorAutor = async (id_autor) => {
    const [libros] = await pool.query('SELECT * FROM libros WHERE id_autor = ?', [id_autor]);
    return libros;
};

//*************** M O S T R A R ****** L I B R O S *********************** */

export const obtenerTodosLosLibros = async () => {
    const [libros] = await pool.query('SELECT * FROM libros');
    return libros;
};