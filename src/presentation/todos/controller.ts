import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos/';

export class TodosController {
  constructor() {}

  getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();

    return res.json(todos);
  };

  getTodosById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      return res.status(400).json(`id: "${id}" not valid`);
    }

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
      throw new Error(`todo with id: "${id}" not found`);
    }

    return res.json(todo);
  };

  createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }
    const newTodo = await prisma.todo.create({ data: createTodoDto! });
    return res.status(201).json(newTodo);
  };

  updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) {
      return res.status(400).json({ message: error });
    }

    const todoToUpdate = await prisma.todo.findFirst({ where: { id } });

    if (!todoToUpdate) {
      throw new Error(`todo with id: "${id}" not found`);
    }

    // const { text, completedAt } = req.body;

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values,
    });

    return res.status(201).json(updatedTodo);
  };

  deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({ message: `id: "${id}" not valid` });
    }

    const todoToDelete = await prisma.todo.findFirst({ where: { id } });

    if (!todoToDelete) {
      throw new Error(`todo with id: "${id}" not found`);
    }

    const deletedTodo = await prisma.todo.delete({ where: { id: Number(id) } });

    return deletedTodo
      ? res.status(201).json({ deletedTodo })
      : res.status(201).json({ error: `todo with id ${id} not found` });
  };
}
