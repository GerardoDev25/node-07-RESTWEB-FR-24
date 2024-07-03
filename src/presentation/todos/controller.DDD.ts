import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain/repositories';

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    return res.json(todos);
  };

  getTodosById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    try {
      const todo = await this.todoRepository.findById(id);
      return res.json(todo);
    } catch (error) {
      console.log(error);
      return res.status(400).json(`${error}`);
    }
  };

  createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const newTodo = await this.todoRepository.create(createTodoDto!);
    return res.status(201).json(newTodo);
  };

  updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) {
      return res.status(400).json({ message: error });
    }

    // try {
    const todoToUpdate = await this.todoRepository.updateById(updateTodoDto!);
    return res.status(200).json(todoToUpdate);
    // } catch (error) {
    //   console.log(error);
    //   return res.status(400).json(`${error}`);
    // }
  };

  deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    // try {
    const deletedTodo = await this.todoRepository.deleteById(id);
    return res.status(200).json(deletedTodo);
    // } catch (error) {
    //   console.log(error);
    //   return res.status(400).json(`${error}`);
    // }
  };
}
