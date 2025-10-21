require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const configJson = require('./config.json');
const baseConfig = configJson[env];

module.exports = {
  port: process.env.DB_PORT || baseConfig.port || 3306,
  db: {
    host: baseConfig.host === 'env' ? process.env.MYSQL_HOST : baseConfig.host,
    username: baseConfig.username === 'env' ? process.env.MYSQL_USER : baseConfig.username,
    password: baseConfig.password === 'env' ? process.env.MYSQL_PASSWORD : baseConfig.password,
    database: baseConfig.database === 'env' ? process.env.MYSQL_DB : baseConfig.database,
    dialect: baseConfig.dialect,
    migrationStorage: baseConfig.migrationStorage,
    migrationStoragePath: baseConfig.migrationStoragePath,
    seederStorage: baseConfig.seederStorage,
    seederStoragePath: baseConfig.seederStoragePath
  },
};