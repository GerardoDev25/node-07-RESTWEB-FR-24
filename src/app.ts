import { envs } from './config/config';
import { Server } from './presentation/server';

(async () => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
  });

  server.start();
}
