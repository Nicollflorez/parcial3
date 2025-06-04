import express from 'express';
const router = express.Router();
import {
    formCrearServicio,
    crearServicio,
    buscarServicioPorNombre,
    editarServicio,
    listarServicios,
    formEditarServicio
} from '../controllers/servicios.js';

// Rutas para mostrar formularios
router.get('/crear', formCrearServicio);
router.get('/editar', buscarServicioPorNombre); // Para buscar por nombre y mostrar el formulario de edición
router.get('/editar/:id', formEditarServicio); // Para mostrar el formulario de edición por ID
router.get('/', listarServicios); // Listar todos los servicios

// Rutas para procesar acciones
router.post('/crear', crearServicio);
router.post('/editar/:id', editarServicio); // Para actualizar un servicio existente

export default router;