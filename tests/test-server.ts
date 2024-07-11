import { Server } from '../src/presentation/server';
import { envs } from '../src/config/config';
import { AppRouter } from '../src/presentation/routes';

export const testServer = new Server({
  port: envs.PORT,
  publicPath: envs.PUBLIC_PATH,
  router: AppRouter.router,
});
