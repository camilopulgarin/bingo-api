const bcrypt = require('bcrypt');
const userService = require('../src/domain/services/userService');
jest.mock('../src/domain/repositories/userRepository', () => require('./mocks/userRepositoryMock'));

describe('User Service: authenticateUser', () => {
  it('should authenticate a user with valid credentials', async () => {
    const email = 'prueba@prueba.com';
    const password = '123456789';
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    const user = await userService.authenticateUser(email, password);
    expect(user).toHaveProperty('id');
    expect(user.email).toBe(email);
  });

  it('should return null for invalid credentials', async () => {
    const email = 'prueba@prueba.com';
    const password = '1234567892';
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    const user = await userService.authenticateUser(email, password);
    expect(user).toBeNull();
  });
});
