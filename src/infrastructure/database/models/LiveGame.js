const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const LiveGame = sequelize.define('LiveGame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    drawn_balls: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('ongoing', 'completed'),
      defaultValue: 'ongoing',
    },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return LiveGame;
};