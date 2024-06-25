import { Router } from 'express';
import { TodoRouter } from './todos/routes';

export class AppRouter {
  constructor() {}

  static get router(): Router {
    const router = Router();

    router.use('/api/todos', TodoRouter.router);

    return router;
  }
}
