const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const BingoBoard = sequelize.define('BingoBoard', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    game_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    numbers: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return BingoBoard;
};