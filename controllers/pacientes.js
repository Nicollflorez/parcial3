import Paciente from '../models/Paciente.js';

// Mostrar formulario para crear paciente
export const formCrearPaciente = (req, res) => {
  res.render('pacientes/crearPaciente', {
    titulo: 'Registrar Paciente',
    query: req.query,
    datos: {}
  });
};

// Procesar creación del paciente
export const crearPaciente = async (req, res) => {
  const { nombre, cedula, fechaNacimiento, genero, telefono, correo, direccion } = req.body;

  try {
    await Paciente.create({
      nombre,
      cedula,
      fechaNacimiento,
      genero,
      telefono,
      correo,
      direccion
    });

    res.redirect('/pacientes/crear?exito=1');
  } catch (error) {
    console.error('⛔ Error al registrar paciente:', error.message);
    res.render('pacientes/crearPaciente', {
      titulo: 'Registrar Paciente',
      error: 'Error al registrar el paciente',
      datos: req.body
    });
  }
};

// Buscar paciente por nombre y mostrar formulario para editar
export const buscarPacientePorNombre = async (req, res) => {
  const { nombre } = req.query;

  if (!nombre) {
    return res.render('pacientes/editarPaciente', {
      titulo: 'Editar Paciente',
      paciente: null,
      nombre: null
    });
  }

  try {
    const paciente = await Paciente.findOne({ where: { nombre } });

    res.render('pacientes/editarPaciente', {
      titulo: 'Editar Paciente',
      paciente,
      nombre
    });
  } catch (error) {
    console.error('⛔ Error al buscar paciente por nombre:', error.message);
    res.status(500).send('Error del servidor');
  }
};

// Procesar edición del paciente (requiere ID)
export const editarPaciente = async (req, res) => {
  const { id } = req.params;
  const { nombre, cedula, fechaNacimiento, genero, telefono, correo, direccion } = req.body;

  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return res.status(404).send('Paciente no encontrado');
    }

    await paciente.update({
      nombre,
      cedula,
      fechaNacimiento,
      genero,
      telefono,
      correo,
      direccion
    });

    res.redirect('/pacientes');
  } catch (error) {
    console.error('⛔ Error al editar paciente:', error.message);
    res.render('pacientes/editarPaciente', {
      titulo: 'Editar Paciente',
      error: 'Error al editar el paciente',
      paciente: {
        id,
        nombre,
        cedula,
        fechaNacimiento,
        genero,
        telefono,
        correo,
        direccion
      }
    });
  }
};

// Listar todos los pacientes
export const listarPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.render('pacientes/listaPacientes', {
      titulo: 'Lista de Pacientes',
      pacientes
    });
  } catch (error) {
    console.error('⛔ Error al listar pacientes:', error.message);
    res.render('pacientes/listaPacientes', {
      titulo: 'Lista de Pacientes',
      error: 'Error al obtener los pacientes',
      pacientes: []
    });
  }
};



