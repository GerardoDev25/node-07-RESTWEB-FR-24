import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';
import { before } from 'node:test';

describe('todo route testing', () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  const todo1 = { text: 'hello world 1' };
  const todo2 = { text: 'hello world 2' };

  test('should return TODOS api/todos', async () => {
    await prisma.todo.createMany({
      data: [todo1, todo2],
    });

    const { body } = await request(testServer.app)
      .get('/api/todos')
      .expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].text).toBe(todo1.text);
    expect(body[1].text).toBe(todo2.text);
  });

  test('should return TODO api/todos/:id', async () => {
    const todoCreate = await prisma.todo.create({ data: { ...todo1 } });

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoCreate.id}`)
      .expect(200);

    expect(body).toBeInstanceOf(Object);
    expect(body).toEqual({
      id: todoCreate.id,
      text: todoCreate.text,
      // completedAt: todoCreate.completedAt,
    });
  });
});
