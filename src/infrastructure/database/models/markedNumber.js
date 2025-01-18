const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('markedNumber', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
            model: 'game',
            key: 'id',
            },
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
    tableName: 'markedNumber',
    timestamps: true,
    });
}
