const { sequelize, User, Table } = require('../database/models');
//const User = require('./User'); // Importa el modelo

(async () => {
  try {
    await sequelize.sync({ force: false }); // Crea las tablas si no existen
    console.log('✅ Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('❌ Error al sincronizar:', error);
  } finally {
    await sequelize.close();
  }
})();
