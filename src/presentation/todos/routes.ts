import { Router } from 'express';
import { TodosController } from './controller';
import { TodoRepositoryImpl } from '../../infrastructure/repositories';
import { TodoDatasourceImpl } from '../../infrastructure/datasource';

export class TodoRouter {
  constructor() {}

  static get router(): Router {
    const router = Router();

    const todoDatasource = new TodoDatasourceImpl();
    const todoRepository = new TodoRepositoryImpl(todoDatasource);
    const todosController = new TodosController(todoRepository);

    router.get('/', todosController.getTodos);
    router.get('/:id', todosController.getTodosById);
    router.post('/', todosController.createTodo);
    router.put('/:id', todosController.updateTodo);
    router.delete('/:id', todosController.deleteTodo);
    return router;
  }
}
