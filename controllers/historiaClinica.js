// controllers/historiaClinica.js
import HistoriaClinica from '../models/HistoriaClinica.js';

// Muestra el formulario para crear una nueva historia clínica.
export const formCrearHistoriaClinica = (req, res) => {
  res.render('historiaClinica/crearHistoriaClinica', {
    titulo: 'Crear Historia Clínica',
    query: req.query, // Pasa los parámetros de la URL a la vista
    datos: {} // Objeto para precargar datos del formulario si es necesario
  });
};

// Procesa la creación de una nueva historia clínica.
export const crearHistoriaClinica = async (req, res) => {
  // Extrae los datos del cuerpo de la solicitud (req.body)
  // Asegúrate de que los nombres de los campos coincidan con los del modelo y el formulario
  const { id_paciente, fecha, descripcion, tratamiento } = req.body;

  try {
    // Intenta crear un nuevo registro en la base de datos
    await HistoriaClinica.create({ id_paciente, fecha, descripcion, tratamiento });
    // Si la creación es exitosa, redirige a la misma página con un mensaje de éxito
    res.redirect('/historia-clinica/crear?exito=1');
  } catch (error) {
    // Si ocurre un error, lo registra en la consola
    console.error('⛔ Error al crear historia clínica:', error.message);
    // Renderiza la vista de creación nuevamente, mostrando un mensaje de error
    res.render('historiaClinica/crearHistoriaClinica', {
      titulo: 'Crear Historia Clínica',
      error: 'Error al registrar la historia clínica',
      datos: req.body, // Pasa los datos enviados por el usuario para que no se pierdan
      query: req.query // Asegura que 'query' esté definido para evitar errores en la vista
    });
  }
};

// Busca una historia clínica por ID de paciente para su edición.
export const buscarHistoriaPorPaciente = async (req, res) => {
  const { id_paciente } = req.query;

  // Si no se proporciona un ID de paciente, renderiza el formulario vacío
  if (!id_paciente) {
    return res.render('historiaClinica/editarHistoriaClinica', {
      titulo: 'Editar Historia Clínica',
      historia: null, // No hay historia para mostrar inicialmente
      id_paciente: null
    });
  }

  try {
    // Busca una historia clínica que coincida con el ID de paciente
    const historia = await HistoriaClinica.findOne({ where: { id_paciente } });

    // Renderiza la vista de edición con los datos de la historia encontrada
    res.render('historiaClinica/editarHistoriaClinica', {
      titulo: 'Editar Historia Clínica',
      historia, // Pasa el objeto historia si se encontró
      id_paciente
    });
  } catch (error) {
    console.error('⛔ Error al buscar historia clínica:', error.message);
    res.status(500).send('Error del servidor'); // Envía un error 500 si hay un problema en la búsqueda
  }
};

// Procesa la edición de una historia clínica existente.
export const editarHistoriaClinica = async (req, res) => {
  const { id } = req.params; // Obtiene el ID de la historia clínica de los parámetros de la URL
  // Extrae los datos actualizados del cuerpo de la solicitud
  // Asegúrate de que los nombres de los campos coincidan con los del modelo
  const { descripcion, tratamiento } = req.body;

  try {
    // Busca la historia clínica por su clave primaria (ID)
    const historia = await HistoriaClinica.findByPk(id);
    // Si no se encuentra la historia, envía una respuesta 404
    if (!historia) return res.status(404).send('Historia clínica no encontrada');

    // Actualiza los campos de la historia clínica
    await historia.update({ descripcion, tratamiento });

    // Redirige a la lista de historias clínicas después de la edición exitosa
    res.redirect('/historia-clinica');
  } catch (error) {
    console.error('⛔ Error al editar historia clínica:', error.message);
    // Renderiza la vista de edición nuevamente con un mensaje de error
    res.render('historiaClinica/editarHistoriaClinica', {
      titulo: 'Editar Historia Clínica',
      error: 'Error al editar la historia clínica',
      historia: { // Pasa los datos para que el formulario se precargue
        id,
        descripcion, // Corregido para usar 'descripcion'
        tratamiento
      }
    });
  }
};

// Lista todas las historias clínicas.
export const listarHistoriasClinicas = async (req, res) => {
  try {
    // Obtiene todas las historias clínicas de la base de datos
    const historias = await HistoriaClinica.findAll();
    // Renderiza la vista de la lista con las historias encontradas
    res.render('historiaClinica/listaHistoriaClinica', {
      titulo: 'Lista de Historias Clínicas',
      historias
    });
  } catch (error) {
    console.error('⛔ Error al listar historias clínicas:', error.message);
    // Renderiza la vista de la lista con un mensaje de error si falla la obtención
    res.render('historiaClinica/listaHistoriaClinica', {
      titulo: 'Lista de Historias Clínicas',
      error: 'Error al obtener historias clínicas',
      historias: [] // Pasa un array vacío para evitar errores en la vista
    });
  }
};

// Exporta todas las funciones del controlador
export default {
  formCrearHistoriaClinica,
  crearHistoriaClinica,
  buscarHistoriaPorPaciente,
  editarHistoriaClinica,
  listarHistoriasClinicas
};
