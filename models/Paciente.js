import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Paciente = db.define('Paciente', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nombre_completo'
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'fecha_nacimiento'
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'pacientes',
  timestamps: false
});

export default Paciente;




