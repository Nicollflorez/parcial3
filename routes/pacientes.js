import express from 'express';
import {
  formCrearPaciente,
  crearPaciente,
  listarPacientes,
  buscarPacientePorNombre,
  editarPaciente
} from '../controllers/pacientes.js';

const router = express.Router();

// Mostrar formulario para crear paciente
router.get('/crear', formCrearPaciente);

// Procesar creación
router.post('/crear', crearPaciente);

// Buscar paciente por nombre y mostrar formulario para editar
router.get('/editar', buscarPacientePorNombre); // GET con query ?nombre=...

// Procesar edición (requiere ID del paciente en la ruta)
router.post('/editar/:id', editarPaciente);

// Listar pacientes
router.get('/', listarPacientes);

export default router;




