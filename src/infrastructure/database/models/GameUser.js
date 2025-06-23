const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const GameUser = sequelize.define('GameUser', {
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
    status: {
      type: DataTypes.ENUM('playing', 'won', 'lost'),
      defaultValue: 'playing',
    },
    selected_tables: {
      type: DataTypes.JSON,
      allowNull: true, // se llena cuando el usuario ingresa
    },
    game_mode_vote: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    board_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return GameUser;
};
