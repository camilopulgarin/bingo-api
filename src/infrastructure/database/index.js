const { Sequelize } = require('sequelize');
const { db } = require('../config');

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: 'mysql',
});

const connectDB = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
};

module.exports = { sequelize, connectDB };