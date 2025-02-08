const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Table', {
    id: {
      type: DataTypes.UUID, // Verifica si realmente necesitas UUID
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: true, // Activa los timestamps
    createdAt: 'created_at', // Mapea createdAt a created_at
    updatedAt: false, // Si no tienes la columna updated_at
  }
);
};
