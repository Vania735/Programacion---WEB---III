import express from 'express';
import {obtenerObjetos,Agregar,ActualizarObjetos, EliminarObjetos, obtenerLibrosDelAutor, obtenerTodosLosLibros} from '../controller/FarmaciaController.js';
const rutas=express.Router();

rutas.get('/',obtenerObjetos);
rutas.post('/',Agregar);
rutas.put('/:id',ActualizarObjetos);
rutas.delete('/:id',EliminarObjetos);
rutas.get('/:id/libros', obtenerLibrosDelAutor);

// NUEVA RUTA PARA TODOS LOS LIBROS
rutas.get('/libros/todos', obtenerTodosLosLibros);

export default rutas;   