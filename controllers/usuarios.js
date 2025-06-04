import Usuario from '../models/Usuario.js';

// Mostrar formulario de inicio de sesión
const mostrarLogin = (req, res) => {
    res.render('usuarios/login', {
        pagina: 'Iniciar Sesión'
    });
};

// Procesar inicio de sesión
const autenticarUsuario = async (req, res) => {
    const { nombre_usuario, contrasena } = req.body;

    // Validar que los campos no estén vacíos
    if (!nombre_usuario || !contrasena) {
        return res.render('usuarios/login', {
            pagina: 'Iniciar Sesión',
            errores: [{ msg: 'Ambos campos son obligatorios' }],
            nombre_usuario
        });
    }

    try {
        // Buscar al usuario por nombre_usuario
        const usuario = await Usuario.findOne({ where: { nombre_usuario } });

        if (!usuario) {
            return res.render('usuarios/login', {
                pagina: 'Iniciar Sesión',
                errores: [{ msg: 'El usuario no existe' }],
                nombre_usuario
            });
        }

        // Verificar la contraseña
        // NOTA: Aquí se compara en texto plano, lo cual NO es seguro.
        // Para producción, usa bcrypt.compare(contrasena, usuario.contrasena)
        if (usuario.contrasena !== contrasena) {
            return res.render('usuarios/login', {
                pagina: 'Iniciar Sesión',
                errores: [{ msg: 'La contraseña es incorrecta' }],
                nombre_usuario
            });
        }

        // Guardar datos de usuario en la sesión
        req.session.usuario = {
            id: usuario.id,
            nombre_usuario: usuario.nombre_usuario,
            rol: usuario.rol
        };

        req.session.save(() => {
            res.redirect('/'); // Redirigir al inicio o dashboard
        });

    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(500).send('Error del servidor');
    }
};

// Cerrar sesión
const cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/usuarios/login');
    });
};

// Exportar controladores
export {
    mostrarLogin,
    autenticarUsuario,
    cerrarSesion
};
