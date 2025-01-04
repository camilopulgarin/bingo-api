const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');

const Session = sequelize.define('Session', {
    id_Session: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_User: {
        type: DataTypes.INTEGER,
        FOREIGNKEYS: true,
        autoIncrement: true,
        allowNull: false,
    },
})

module.exports = Session;