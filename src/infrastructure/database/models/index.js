const { Sequelize } = require('sequelize');
const UserModel = require('./User');
const TableModel = require('./Table');
const GameModel = require('./Game');
const GameUserModel = require('./GameUser');
const BingoBoardModel = require('./BingoBoard');

const dbUser = process.env.MYSQL_USER || 'root';
const dbPassword = process.env.MYSQL_PASSWORD || 'root';
const dbHost = process.env.MYSQL_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '3306';
const dbName = process.env.MYSQL_DB || 'bingo_db';

const dbUrl = `mysql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
const sequelize = new Sequelize(process.env.DB_URL || dbUrl);

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
