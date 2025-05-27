const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../src/app/routes/authRoutes');

jest.mock('../src/domain/services/authService');
const authService = require('../src/domain/services/authService');

jest.mock('../src/infrastructure/security/jwtHelper'); // 👈 mock jwtHelper
const jwtHelper = require('../src/infrastructure/security/jwtHelper'); // 👈 importa el mock

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/auth', authRoutes);

describe('Auth Controller: /login', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpia mocks entre pruebas
  });

  it('should return a token for valid credentials', async () => {
    authService.authenticateUser.mockResolvedValue({
      id: 1,
      email: 'prueba@prueba.com'
    });

    jwtHelper.generateToken.mockReturnValue('fake-jwt-token'); // 👈 mock del token

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'prueba@pruebeeea.com', password: '123456789' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token', 'fake-jwt-token'); // 👈 verifica el token mockeado
  });

  it('should return 401 for invalid credentials', async () => {
    authService.authenticateUser.mockResolvedValue(null);
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'prueba@prueba.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid email or password');
  });

  it('should return 500 if an internal error occurs', async () => {
    // Simular un error inesperado
    authService.authenticateUser.mockRejectedValue(new Error('DB Error'));

    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'error@test.com', password: 'any' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Internal Server Error');
    expect(response.body).toHaveProperty('error', 'DB Error');
  });
});
