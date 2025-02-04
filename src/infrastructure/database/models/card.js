const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('card', {
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
    },
    {
        tableName: 'card',
        timestamps: true,
    });
}