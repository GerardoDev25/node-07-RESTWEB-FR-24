import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';

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
    const { text } = req.body;

    try {
      if (!text) {
        throw new Error('text property is required');
      }
      const newTodo = await prisma.todo.create({ data: { text } });
      return res.status(201).json(newTodo);
    } catch (error) {
      return res.status(400).json({ message: `${error}` });
    }
  };

  updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) {
      return res.status(400).json({ message: `id: "${id}" not valid` });
    }

    const todoToUpdate = await prisma.todo.findFirst({ where: { id } });

    if (!todoToUpdate) {
      throw new Error(`todo with id: "${id}" not found`);
    }

    const { text, completedAt } = req.body;

    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: { text, completedAt: completedAt ? new Date(completedAt) : null },
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
