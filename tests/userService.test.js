const userService = require('../src/domain/services/userService');
const userRepository = require('../src/domain/repositories/userRepository');

jest.mock('../src/domain/repositories/userRepository');

describe('User Service', () => {
  it('should register a new user', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.create.mockResolvedValue({ id: 1, name: 'John Doe', email: 'john@example.com' });

    const user = await userService.registerUser({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password123!',
    });

    expect(user).toHaveProperty('id');
  });
});
