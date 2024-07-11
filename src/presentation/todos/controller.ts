import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain/repositories';
import {
  GetTodoById,
  GetTodos,
  CreateTodo,
  DeleteTodo,
  UpdateTodo,
} from '../../domain/use-cases/todo';

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.status(200).json(todos))
      .catch((error) => res.status(400).json({ error: `${error}` }));
  };

  getTodosById = (req: Request, res: Response) => {
    const id = +req.params.id;
    new GetTodoById(this.todoRepository)
      .execute(id)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(400).json({ error: `${error}` }));
  };

  createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }
    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => res.status(201).json(todo))
      .catch((error) => res.status(400).json({ error: `${error}` }));
  };

  updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) {
      return res.status(400).json({ message: error });
    }
    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(404).json({ error: `${error}` }));
  };

  deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => res.status(400).json({ error: `${error}` }));
  };
}
