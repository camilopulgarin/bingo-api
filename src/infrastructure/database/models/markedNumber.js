const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MarkedNumber = sequelize.define('MarkedNumber', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'games',
      key: 'id',
    },
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'marked_numbers',
  timestamps: true,
});

module.exports = MarkedNumber;
