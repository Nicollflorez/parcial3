import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Servicio = db.define('Servicio', {
    id: { // Es buena práctica incluir la definición del ID
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_servicio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'servicios', // Especificamos el nombre de la tabla existente
    timestamps: false // Si tu tabla no tiene campos createdAt y updatedAt
});

export default Servicio;