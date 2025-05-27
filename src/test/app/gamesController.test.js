const request = require('supertest');
const app = require('../app'); // tu instancia de express
const gameRepository = require('../repositories/gameRepository');
const jwt = require('jsonwebtoken');

jest.mock('../repositories/gameRepository');

describe('POST /games', () => {
  const token = jwt.sign({ id: 'creator-user-id' }, 'secret'); // usa tu secreto real

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe crear una partida exitosamente', async () => {
    const mockGame = {
      id: 'game-id-123',
      name: 'Aventura en la jungla',
      capacity: 5,
      creator_id: 'creator-user-id',
    };

    gameRepository.create.mockResolvedValue(mockGame);
    gameRepository.addUsersToGame.mockResolvedValue();

    const res = await request(app)
      .post('/games')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Aventura en la jungla',
        capacity: 5,
        userIds: ['123', '456'],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.game.name).toBe('Aventura en la jungla');
    expect(gameRepository.create).toHaveBeenCalledWith({
      name: 'Aventura en la jungla',
      capacity: 5,
      creator_id: 'creator-user-id',
    });
    expect(gameRepository.addUsersToGame).toHaveBeenCalledWith('game-id-123', ['123', '456']);
  });

  it('debe retornar 400 si faltan campos', async () => {
    const res = await request(app)
      .post('/games')
      .set('Authorization', `Bearer ${token}`)
      .send({ capacity: 5 });

    expect(res.statusCode).toBe(400);
  });

  it('debe retornar 401 si no hay token', async () => {
    const res = await request(app)
      .post('/games')
      .send({
        name: 'Juego sin token',
        capacity: 4,
        userIds: [],
      });

    expect(res.statusCode).toBe(401);
  });
});
