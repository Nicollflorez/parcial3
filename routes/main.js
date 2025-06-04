import express from 'express';
const router = express.Router();

// Ruta para la página principal (raíz del sitio)
router.get('/', (req, res) => {
  res.render('index', { title: 'Beauty Smile' }); // Renderiza la vista 'index.pug'
});

export default router;