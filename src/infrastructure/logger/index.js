const { createLogger, transports, format } = require('winston');

// Configuración del logger
const logger = createLogger({
  level: 'info', // Nivel de logging: info, error, warn, etc.
  format: format.combine(
    format.timestamp(), // Agrega timestamp a los logs
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`) // Formato personalizado
  ),
  transports: [
    new transports.Console(), // Salida a la consola
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Archivo para errores
    new transports.File({ filename: 'logs/combined.log' }), // Archivo combinado
  ],
});

// Exportar el logger
module.exports = logger;
