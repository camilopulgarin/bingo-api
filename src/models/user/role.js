const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Role = sequelize.define('Role', {
    id_Role: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nameRole: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
})

module.exports = Role;