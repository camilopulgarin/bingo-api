const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.UUID, // Verifica si realmente necesitas UUID
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('player', 'admin'),
      defaultValue: 'player',
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phone: { // Nueva columna
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Activa los timestamps
    createdAt: 'created_at', // Mapea createdAt a created_at
    updatedAt: false, // Si no tienes la columna updated_at
  }
);
};
