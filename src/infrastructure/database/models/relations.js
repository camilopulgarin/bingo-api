const sequelize = require('../config/database');
const User = require('./User');
const card = require('./card');
const game = require('./game');
const markedNumber = require('./markedNumber');

// Relaciones
User.hasMany(card, { foreignKey: 'userId' });
card.belongsTo(User, { foreignKey: 'userId' });

game.hasMany(markedNumber, { foreignKey: 'gameId' });
markedNumber.belongsTo(game, { foreignKey: 'gameId' });

module.exports = { sequelize, User, card, game, markedNumber };
