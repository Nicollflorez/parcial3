import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const HistoriaClinica = db.define('historia_clinica', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tratamiento: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'historia_clinica', // Especificamos el nombre singular de la tabla
  timestamps: false
});

export default HistoriaClinica;


