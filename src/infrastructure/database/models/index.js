const { Sequelize } = require('sequelize');
const UserModel = require('./User');

const sequelize = new Sequelize(process.env.DB_URL || 'mysql://root:root@localhost:3306/bingo_db');

// Inicializar modelos
const User = UserModel(sequelize);

// Asociaciones de modelos (si es necesario)
// Ejemplo: User.hasMany(Post);

// Exportar modelos y conexión
module.exports = {
  sequelize,
  User,
};
