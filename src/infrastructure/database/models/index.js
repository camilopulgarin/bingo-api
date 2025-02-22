const { Sequelize } = require('sequelize');
const UserModel = require('./User');
const TableModel = require('./Table');
const GameModel = require('./Game');
const GameUserModel = require('./GameUser');

const sequelize = new Sequelize(process.env.DB_URL || 'mysql://root:root@localhost:3306/bingo_db');

// Inicializar modelos
const User = UserModel(sequelize);
const Table = TableModel(sequelize);
const Game = GameModel(sequelize);
const GameUser = GameUserModel(sequelize);

// Asociaciones de modelos (si es necesario)
// Ejemplo: User.hasMany(Post);

// Exportar modelos y conexión
module.exports = {
  sequelize,
  User,
  Table,
  Game,
  GameUser,
};
