// index.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import db from './config/db.js'; // Sequelize o la conexión que uses

// Rutas
import mainRoutes from './routes/main.js'; // Importa mainRoutes
import pacientesRoutes from './routes/pacientes.js';
import citasRoutes from './routes/citas.js';
import serviciosRoutes from './routes/servicios.js';
import historiaClinicaRoutes from './routes/historiaClinica.js';
import usuariosRoutes from './routes/usuarios.js'; // ← Login y logout

const app = express();
const port = process.env.PORT || 3000;

// Para obtener __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexión a la base de datos
try {
    await db.authenticate();
    await db.sync();
    console.log('✅ Conexión a la base de datos exitosa');
} catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
}

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'mi_secreto_super_seguro',
        resave: false,
        saveUninitialized: false,
    })
);

// Vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Variables globales
app.use((req, res, next) => {
    res.locals.actualYear = new Date().getFullYear();
    res.locals.nombreSitio = 'Beauty Smile';
    res.locals.usuario = req.session.usuario || null;
    next();
});

// Rutas
app.use('/', mainRoutes); // Usa mainRoutes para la ruta raíz
app.use('/pacientes', pacientesRoutes);
app.use('/citas', citasRoutes);
app.use('/servicios', serviciosRoutes);
app.use('/historia-clinica', historiaClinicaRoutes);
app.use('/usuarios', usuariosRoutes); // ← Login y logout

// Ruta raíz (dashboard protegido) - MOVIENDO LA LÓGICA A mainRoutes
// app.get('/', (req, res) => {
//   if (req.session.usuario) {
//     return res.render('layouts/main', { titulo: 'Dashboard' });
//   }
//   return res.redirect('/usuarios/login');
// });

// Arranque del servidor
app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en: http://localhost:${port}`);
});