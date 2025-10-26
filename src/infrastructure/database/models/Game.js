const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Game = sequelize.define('Game', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'configured', 'in_progress', 'completed'),
      defaultValue: 'pending',
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creator_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    winner: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
    },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Game;
};
