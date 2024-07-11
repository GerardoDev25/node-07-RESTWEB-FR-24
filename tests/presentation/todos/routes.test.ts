import request from 'supertest';
import { testServer } from '../../test-server';

describe('todo route testing', () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  test('should return TODOS api/todos', async () => {
    const response = await request(testServer.app)
      .get('/api/todos')
      .expect(200);
    console.log(response.body);
  });
});
