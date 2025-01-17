const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('../src/app/routes/authRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

describe('Auth Controller: /login', () => {
  it('should return a token for valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'prueba@prueba.com', password: '1234567891' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'prueba@prueba.com', password: '123458896' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid email or password');
  });
});
