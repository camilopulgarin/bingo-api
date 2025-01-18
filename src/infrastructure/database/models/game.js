const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('game', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
    tableName: 'game',
    timestamps: true,
    });
}
