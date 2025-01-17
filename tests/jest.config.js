module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'], // Opcional si tienes configuración global
    coverageDirectory: 'coverage',
    collectCoverage: true
  };