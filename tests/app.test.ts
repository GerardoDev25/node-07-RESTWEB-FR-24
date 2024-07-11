import { envs } from '../src/config/config';
import { Server } from '../src/presentation/server';

jest.mock('../src/presentation/server');

describe('app.ts', () => {
  test('should call server with arguments and start', async () => {
    await import('../src/app');

    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      publicPath: envs.PUBLIC_PATH,
      router: expect.any(Function),
    });

    expect(Server.prototype.start).toHaveBeenCalledTimes(1);
    expect(Server.prototype.start).toHaveBeenCalledWith();
    
  });
  
});
