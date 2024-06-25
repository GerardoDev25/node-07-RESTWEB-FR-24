import express, { Router } from 'express';
import path from 'node:path';
import { AppRouter } from './routes';

interface Options {
  port: number;
  publicPath: string;
  router: Router;
}

export class Server {
  private app = express();

  private readonly port: number;
  private readonly publicPath: string;
  private readonly router: Router;

  constructor(options: Options) {
    this.port = options.port;
    this.publicPath = options.publicPath;
    this.router = options.router;
  }
  async start() {
    // * middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // * public folder
    this.app.use(express.static(this.publicPath));

    // * routes
    this.app.use(this.router);

    // * SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join(
        __dirname,
        `../../${this.publicPath}/index.html`
      );
      return res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log('Server on port 3000');
    });
  }
}
