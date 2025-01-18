const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Card = sequelize.define('Card', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
  },
  numbers: {
    type: DataTypes.JSON,
    allowNull: false,
  },
}, {
  tableName: 'cards',
  timestamps: true,
});

module.exports = Card;
