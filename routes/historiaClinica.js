import express from 'express';
import {
  formCrearHistoriaClinica,
  crearHistoriaClinica,
  buscarHistoriaPorPaciente,
  editarHistoriaClinica,
  listarHistoriasClinicas
} from '../controllers/historiaClinica.js';

const router = express.Router();

router.get('/crear', formCrearHistoriaClinica);
router.post('/crear', crearHistoriaClinica);
router.get('/editar', buscarHistoriaPorPaciente); // ?id_paciente=...
router.post('/editar/:id', editarHistoriaClinica);
router.get('/', listarHistoriasClinicas);

export default router;
