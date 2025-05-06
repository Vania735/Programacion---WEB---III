import {Router} from 'express';
import { obtenerProductos, crearProducto,ActualizarNuevoProducto,EliminarProductos} from '../controller/ProductController.js';

const router=Router();

router.get('/personas',obtenerProductos);
router.post('/personas',crearProducto);
router.put('/personas/:id',ActualizarNuevoProducto);
router.delete('/personas/:id',EliminarProductos);
export default router;