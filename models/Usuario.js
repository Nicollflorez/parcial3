import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Usuario = db.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    contrasena: {
        type: DataTypes.STRING(60), // La longitud dependerá de si usas hashing
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    timestamps: false // Opcional: si no quieres las columnas createdAt y updatedAt
});

export default Usuario;