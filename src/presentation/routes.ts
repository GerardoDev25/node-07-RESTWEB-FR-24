import { Router } from 'express';

export class AppRouter {
  constructor() {}

  static get router(): Router {
    const router = Router();
    router.get('/api/todos', (req, res) => {
      return res.json([
        { id: 1, task: 'buy milk', createdAt: new Date() },
        { id: 2, task: 'buy bread', createdAt: null },
        { id: 3, task: 'buy butter', createdAt: new Date() },
      ]);
    });
    return router;
  }
}
