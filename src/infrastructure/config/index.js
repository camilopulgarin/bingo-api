module.exports = {
    port: process.env.DB_PORT || 3306,
    db: {
      host: process.env.MYSQL_HOST,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    },
  };