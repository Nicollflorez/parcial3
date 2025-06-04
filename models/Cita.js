import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Paciente from './Paciente.js'; // Importar el modelo de Paciente para las asociaciones
import Servicio from './Servicio.js'; // Importar el modelo de Servicio para las asociaciones

const Cita = db.define('Cita', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
        defaultValue: 'pendiente'
    }
}, {
    tableName: 'citas',
    timestamps: false
});

// Asociaciones (opcional aquí, pero útil para las consultas)
Cita.belongsTo(Paciente, { foreignKey: 'id_paciente' });
Cita.belongsTo(Servicio, { foreignKey: 'id_servicio' });

export default Cita;
