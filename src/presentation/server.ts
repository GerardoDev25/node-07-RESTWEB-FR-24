import express from 'express';
import path from 'node:path';

interface Options {
  port: number;
  publicPath: string;
}

export class Server {
  private app = express();

  private readonly port: number;
  private readonly publicPath: string;

  constructor(options: Options) {
    this.port = options.port;
    this.publicPath = options.publicPath;
  }
  async start() {
    // * middlewares

    // * public folder
    this.app.use(express.static(this.publicPath));

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
