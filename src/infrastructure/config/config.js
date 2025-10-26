module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    migrationStorage: "json",
    migrationStoragePath: "src/infrastructure/migrations-meta.json",
    seederStorage: "json",
    seederStoragePath: "src/infrastructure/seeders-meta.json"
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    migrationStorage: "json",
    migrationStoragePath: "src/infrastructure/migrations-meta.json",
    seederStorage: "json",
    seederStoragePath: "src/infrastructure/seeders-meta.json"
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    migrationStorage: "json",
    migrationStoragePath: "src/infrastructure/migrations-meta.json",
    seederStorage: "json",
    seederStoragePath: "src/infrastructure/seeders-meta.json"
  }
};
