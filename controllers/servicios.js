import Servicio from '../models/Servicio.js';

// Mostrar formulario para crear servicio
export const formCrearServicio = (req, res) => {
    res.render('servicios/crearServicio', {
        titulo: 'Crear Nuevo Servicio',
        query: req.query,
        datos: {}
    });
};

// Procesar creación del servicio
export const crearServicio = async (req, res) => {
    const { nombre_servicio, descripcion, precio } = req.body;

    try {
        await Servicio.create({
            nombre_servicio,
            descripcion,
            precio
        });

        res.redirect('/servicios/crear?exito=1');
    } catch (error) {
        console.error('⛔ Error al crear servicio:', error.message);
        res.render('servicios/crearServicio', {
            titulo: 'Crear Nuevo Servicio',
            error: 'Error al crear el servicio',
            datos: req.body
        });
    }
};

// Mostrar formulario para editar servicio (búsqueda por nombre)
export const buscarServicioPorNombre = async (req, res) => {
    const { nombre_servicio } = req.query;

    if (!nombre_servicio) {
        return res.render('servicios/editarServicio', {
            titulo: 'Editar Servicio',
            servicio: null,
            nombre_servicio: null
        });
    }

    try {
        const servicio = await Servicio.findOne({ where: { nombre_servicio } });

        res.render('servicios/editarServicio', {
            titulo: 'Editar Servicio',
            servicio,
            nombre_servicio
        });
    } catch (error) {
        console.error('⛔ Error al buscar servicio por nombre:', error.message);
        res.status(500).send('Error del servidor');
    }
};

// Procesar edición del servicio (requiere ID)
export const editarServicio = async (req, res) => {
    const { id } = req.params;
    const { nombre_servicio, descripcion, precio } = req.body;

    try {
        const servicio = await Servicio.findByPk(id);
        if (!servicio) {
            return res.status(404).send('Servicio no encontrado');
        }

        await servicio.update({
            nombre_servicio,
            descripcion,
            precio
        });

        res.redirect('/servicios');
    } catch (error) {
        console.error('⛔ Error al editar servicio:', error.message);
        res.render('servicios/editarServicio', {
            titulo: 'Editar Servicio',
            error: 'Error al editar el servicio',
            servicio: {
                id,
                nombre_servicio,
                descripcion,
                precio
            }
        });
    }
};

// Listar todos los servicios
export const listarServicios = async (req, res) => {
    try {
        const servicios = await Servicio.findAll();
        res.render('servicios/listaServicios', {
            titulo: 'Lista de Servicios',
            servicios
        });
    } catch (error) {
        console.error('⛔ Error al listar servicios:', error.message);
        res.render('servicios/listaServicios', {
            titulo: 'Lista de Servicios',
            error: 'Error al obtener los servicios',
            servicios: []
        });
    }
};

// Mostrar formulario para editar servicio por ID
export const formEditarServicio = async (req, res) => {
    const { id } = req.params;
    try {
        const servicio = await Servicio.findByPk(id);
        if (!servicio) {
            return res.redirect('/servicios');
        }
        res.render('servicios/editarServicio', {
            titulo: 'Editar Servicio',
            servicio
        });
    } catch (error) {
        console.error('Error al obtener servicio para editar:', error);
        res.redirect('/servicios');
    }
};