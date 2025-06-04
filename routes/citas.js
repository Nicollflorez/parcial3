import express from 'express';
import {
    formNuevaCita,
    nuevaCita,
    listarCitas,
    mostrarBuscarEditarCita, // Esta función manejará GET y POST para /citas/editar
    editarCita // Para el POST de la actualización de la cita
} from '../controllers/citas.js';

const router = express.Router();

// Rutas para crear citas
router.get('/nueva', formNuevaCita);
router.post('/nueva', nuevaCita);

// Ruta para listar citas
router.get('/', listarCitas);

// Rutas combinadas para buscar y editar una cita
// GET: Muestra el formulario de búsqueda (inicialmente sin datos de cita)
// POST: Maneja el envío del ID para buscar la cita y luego muestra el formulario de edición (o error)
router.get('/editar', mostrarBuscarEditarCita);
router.post('/editar', mostrarBuscarEditarCita);

// Ruta para manejar el envío del formulario de edición de una cita específica
router.post('/editar/:id', editarCita);

export default router;
