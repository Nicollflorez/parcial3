import express from 'express';
import {
    mostrarLogin,
    autenticarUsuario,
    cerrarSesion
} from '../controllers/usuarios.js';

const router = express.Router();

// Mostrar formulario de login
router.get('/login', mostrarLogin);

// Procesar formulario de login
router.post('/login', autenticarUsuario);

// Cerrar sesión
router.get('/logout', cerrarSesion); // Cambié la ruta a /logout para ser semánticamente correcta

export default router;
