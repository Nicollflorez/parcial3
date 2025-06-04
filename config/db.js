import Sequelize from "sequelize";

const db = new Sequelize('BeautySmile_highestcan', 'BeautySmile_highestcan', '6e4ccb3672e49483d1ccd06279ef57b67fb7d4e2', {
  host: '6rvzg.h.filess.io',
  port: 61002,
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

export default db;
