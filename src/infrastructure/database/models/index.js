const { Sequelize } = require('sequelize');
const UserModel = require('./User');
const TableModel = require('./Table');
const GameModel = require('./Game');
const GameUserModel = require('./GameUser');
const BingoBoardModel = require('./BingoBoard');

const sequelize = new Sequelize(process.env.DB_URL || 'mysql://root:root@localhost:3306/bingo_db');

// Inicializar modelos
const User = UserModel(sequelize);
const Table = TableModel(sequelize);
const Game = GameModel(sequelize);
const GameUser = GameUserModel(sequelize);
const BingoBoard = BingoBoardModel(sequelize);

// Asociaciones de modelos (si es necesario)
// Ejemplo: User.hasMany(Post);
// Asociaciones
User.belongsToMany(Game, { through: GameUser, as: 'games', foreignKey: 'user_id' });
Game.belongsToMany(User, { through: GameUser, as: 'players', foreignKey: 'game_id' });

Game.belongsTo(User, { foreignKey: 'creator_id', as: 'creator' });

// Exportar modelos y conexión
module.exports = {
  sequelize,
  User,
  Table,
  Game,
  GameUser,
  BingoBoard
};
