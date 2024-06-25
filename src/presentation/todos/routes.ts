import { Router } from 'express';
import { TodosController } from './controller';

export class TodoRouter {
  constructor() {}

  static get router(): Router {
    const router = Router();
    const todosController = new TodosController();

    router.get('/', todosController.getTodos);
    router.get('/:id', todosController.getTodosById);
    router.post('/', todosController.createTodo);
    router.put('/:id', todosController.updateTodo);
    router.delete('/:id', todosController.deleteTodo);
    return router;
  }
}
