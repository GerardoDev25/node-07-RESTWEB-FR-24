import { Request, Response } from 'express';

const todos = [
  { id: 1, task: 'buy milk', createdAt: new Date() },
  { id: 2, task: 'buy bread', createdAt: null },
  { id: 3, task: 'buy butter', createdAt: new Date() },
];

export class TodosController {
  constructor() {}

  getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  getTodosById = (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === Number(id));

    if (!todo) {
      return res.status(404).json({ message: `Todo with id ${id} not found` });
    }
    return res.json(todo);
  };

  createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'text is required' });
    }

    const newTodo = {
      id: todos.length + 1,
      task: text,
      createdAt: new Date(),
    };
    todos.push(newTodo);
    return res.status(201).json(newTodo);
  };

  updateTodo = (req: Request, res: Response) => {
    const { text, createdAt = new Date() } = req.body;
    const { id } = req.params;

    if (!text) {
      return res.status(400).json({ message: 'text is required' });
    }
    if (isNaN(Number(id))) {
      return res.status(400).json({ message: `id: "${id}" not valid` });
    }

    const oldTodo = todos.find((todo) => todo.id === Number(id));

    if (!oldTodo) {
      return res.status(404).json({ message: `Todo with id ${id} not found` });
    }

    const newTodo = {
      ...oldTodo,
      task: text,
      createdAt: new Date(createdAt),
    };

    todos[oldTodo.id - 1] = newTodo;

    return res.status(201).json(oldTodo);
  };

  deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({ message: `id: "${id}" not valid` });
    }

    const todo = todos.find((todo) => todo.id === Number(id));

    if (!todo) {
      return res.status(404).json({ message: `Todo with id ${id} not found` });
    }

    todos.splice(todo.id - 1, 1);

    return res.status(201).json(todo);
  };
}
