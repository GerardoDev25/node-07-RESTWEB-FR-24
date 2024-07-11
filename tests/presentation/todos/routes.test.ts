import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

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

  // * get all todos

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

  // * get todo

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

  test('should return a 404 notFound api/todos/:id', async () => {
    const todoId = 999;

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoId}`)
      .expect(404);

    // console.log({ body });
    expect(body).toEqual({ error: `todo with id: ${todoId} not found` });
  });

  // * create todo

  test('should create a todo api/todos', async () => {
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send(todo1)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
    });
  });

  test('should return and error if text is not present api/todos', async () => {
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send({ text: '' })
      .expect(400);

    expect(body).toEqual({ message: 'text property is required' });
  });

  test('should return and error if text is not empty api/todos', async () => {
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send({})
      .expect(400);

    expect(body).toEqual({ message: 'text property is required' });
  });

  // * update todo

  test('should update a todo api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: { ...todo1 } });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ text: 'updated todo', completedAt: '2023-12-12' })
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      text: 'updated todo',
      completedAt: '2023-12-12T00:00:00.000Z',
    });
  });

  test('should return a 404 if todo not found', async () => {
    const todoId = 999;

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todoId}`)
      .send({ text: 'updated todo', completedAt: '2023-12-12' })
      .expect(404);

    expect(body).toEqual({ error: 'todo with id: 999 not found' });
  });

  test('should return an update todo only the date', async () => {
    const todo = await prisma.todo.create({ data: { ...todo1 } });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ completedAt: '2023-12-12' })
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      text: todo.text,
      completedAt: '2023-12-12T00:00:00.000Z',
    });
  });

  test('should delete a Todo api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: { ...todo1 } });

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({ id: expect.any(Number), text: todo.text });
  });

  test('should return 404 if todo not exit api/todos/:id', async () => {
    const { body } = await request(testServer.app)
      .delete(`/api/todos/999`)
      .expect(404);

    expect(body).toEqual({ error: 'todo with id: 999 not found' });
  });
});
