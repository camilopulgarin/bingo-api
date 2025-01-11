const bcrypt = require('bcrypt');
const userService = require('../src/domain/services/userService');
jest.mock('../src/domain/repositories/userRepository', () => require('./mocks/userRepositoryMock'));

describe('User Service: authenticateUser', () => {
  it('should authenticate a user with valid credentials', async () => {
    const email = 'john@example.com';
    const password = 'Password123';
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    const user = await userService.authenticateUser(email, password);
    expect(user).toHaveProperty('id');
    expect(user.email).toBe(email);
  });

  it('should return null for invalid credentials', async () => {
    const email = 'john@example.com';
    const password = 'WrongPassword';
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    const user = await userService.authenticateUser(email, password);
    expect(user).toBeNull();
  });
});
