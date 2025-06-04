// controllers/citas.js
import Cita from '../models/Cita.js';
import Paciente from '../models/Paciente.js';
import Servicio from '../models/Servicio.js';

export const formNuevaCita = async (req, res) => {
    try {
        const [pacientes, servicios] = await Promise.all([
            Paciente.findAll(),
            Servicio.findAll()
        ]);
        res.render('citas/crearCita', {
            titulo: 'Nueva Cita',
            pacientes,
            servicios,
            datos: {}
        });
    } catch (error) {
        console.error('Error al cargar formulario de nueva cita:', error);
        res.render('citas/crearCita', {
            titulo: 'Nueva Cita',
            error: 'Error al cargar el formulario',
            pacientes: [],
            servicios: [],
            datos: {}
        });
    }
};

// Crear una nueva cita
export const nuevaCita = async (req, res) => {
    const { paciente, servicio, fecha, hora } = req.body;

    try {
        await Cita.create({
            id_paciente: paciente,
            id_servicio: servicio,
            fecha,
            hora
        });
        res.redirect('/citas/nueva?exito=1');
    } catch (error) {
        console.error('Error al crear la cita:', error);
        const [pacientes, servicios] = await Promise.all([
            Paciente.findAll(),
            Servicio.findAll()
        ]);
        res.render('citas/nuevaCita', {
            titulo: 'Nueva Cita',
            error: 'Error al crear la cita',
            pacientes,
            servicios,
            datos: req.body
        });
    }
};

// Listar citas
export const listarCitas = async (req, res) => {
    try {
        const citas = await Cita.findAll({
            include: [
                { model: Paciente, as: 'Paciente' },
                { model: Servicio, as: 'Servicio' }
            ]
        });
        res.render('citas/listaCitas', {
            titulo: 'Lista de Citas',
            citas
        });
    } catch (error) {
        console.error('Error al listar citas:', error);
        res.render('citas/listaCitas', {
            titulo: 'Lista de Citas',
            error: 'Error al obtener las citas',
            citas: []
        });
    }
};

// FUNCIÓN CORREGIDA: Maneja la lógica de búsqueda y visualización del formulario de edición
export const mostrarBuscarEditarCita = async (req, res) => {
    let cita = null;
    let error = null;
    // CORRECCIÓN AQUÍ: Asegurarse de que req.body exista antes de acceder a idCita
    let idCitaBusqueda = (req.body && req.body.idCita) ? req.body.idCita : ''; 

    // Si la petición es POST, significa que el usuario está buscando una cita
    if (req.method === 'POST') {
        const { idCita } = req.body;

        if (!idCita) {
            error = 'Por favor, ingrese el ID de la cita para buscar.';
        } else {
            try {
                cita = await Cita.findByPk(idCita, {
                    include: [
                        { model: Paciente, as: 'Paciente' },
                        { model: Servicio, as: 'Servicio' }
                    ]
                });
                if (!cita) {
                    error = `No se encontró ninguna cita con el ID: ${idCita}`;
                }
            } catch (err) {
                console.error('Error al buscar la cita:', err);
                error = 'Error al buscar la cita. Intente de nuevo.';
            }
        }
    }

    // Siempre cargamos pacientes y servicios, ya que son necesarios para los select del formulario de edición
    let pacientes = [];
    let servicios = [];
    try {
        [pacientes, servicios] = await Promise.all([
            Paciente.findAll(),
            Servicio.findAll()
        ]);
        // AÑADIDO PARA DEPURACIÓN: Verifica el contenido de servicios
        console.log('Servicios cargados para editar cita:', servicios.map(s => ({ id: s.id, nombre: s.nombre })));

    } catch (err) {
        console.error('Error al cargar pacientes/servicios para editar cita:', err);
        // Si ya hay un error de búsqueda, lo concatenamos
        error = error ? `${error} (Error al cargar listas de pacientes/servicios)` : 'Error al cargar listas de pacientes/servicios.';
    }

    res.render('citas/editarCita', {
        titulo: 'Buscar y Editar Cita',
        cita, // Será null si no se ha buscado o no se encontró
        error,
        pacientes,
        servicios,
        idCitaBusqueda // Pasa el ID buscado de vuelta a la plantilla para que el campo no se borre
    });
};

// Editar una cita existente (esta función maneja el POST del formulario de edición)
export const editarCita = async (req, res) => {
    const { id } = req.params; // ID de la cita a editar
    const { paciente, servicio, fecha, hora, estado } = req.body;

    try {
        const cita = await Cita.findByPk(id);
        if (!cita) {
            // Si la cita no existe, redirigir a la página de búsqueda/edición
            return res.redirect('/citas/editar?error=Cita no encontrada para edición.');
        }

        await cita.update({
            id_paciente: paciente,
            id_servicio: servicio,
            fecha,
            hora,
            estado
        });
        // Redirigir a la lista de citas o a la misma página de edición con un mensaje de éxito
        res.redirect('/citas?exito=Cita actualizada correctamente.');
    } catch (error) {
        console.error('Error al editar la cita:', error);
        // Si hay un error al actualizar, recargar el formulario con los datos y el mensaje de error
        const [pacientes, servicios] = await Promise.all([
            Paciente.findAll(),
            Servicio.findAll()
        ]);
        // AÑADIDO PARA DEPURACIÓN: Verifica el contenido de servicios en caso de error de edición
        console.log('Servicios cargados para re-renderizar en error de edición:', servicios.map(s => ({ id: s.id, nombre: s.nombre })));

        const citaActual = await Cita.findByPk(id, { // Vuelve a cargar la cita para mostrar los datos actuales
            include: [
                { model: Paciente, as: 'Paciente' },
                { model: Servicio, as: 'Servicio' }
            ]
        }); 
        res.render('citas/editarCita', {
            titulo: 'Editar Cita',
            error: 'Error al editar la cita. Verifique los datos.',
            cita: citaActual, // Pasa la cita actual para que el formulario no se vacíe
            pacientes,
            servicios,
            idCitaBusqueda: id // Mantener el ID en el campo de búsqueda si hubo error
        });
    }
};
