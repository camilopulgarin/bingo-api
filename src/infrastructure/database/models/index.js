const { Sequelize } = require('sequelize');
const UserModel = require('./User');

const sequelize = new Sequelize(process.env.DB_URL || 'mysql://user:password@localhost:3306/mydb');

// Inicializar modelos
const User = UserModel(sequelize);

// Asociaciones de modelos (si es necesario)
// Ejemplo: User.hasMany(Post);

// Exportar modelos y conexión
module.exports = {
  sequelize,
  User,
};
