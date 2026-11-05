import { createServer } from 'node:http';

import nextEnv from '@next/env';
import next from 'next';
import { Server } from 'socket.io';

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const dev = process.env.NODE_ENV !== 'production';

const app = next({
  dev,
  dir: './frontend',
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  Promise.all([
    import('./app.ts'),
    import('./env.ts'),
    import('./modules/chat/chat.service.ts'),
    import('./shared/auth/session.ts'),
  ]).then(
    ([{ createApp }, { env }, { ChatService }, { createSessionResolver }]) => {
      const resolveSession = createSessionResolver(env.appOrigin);
      const api = createApp({ resolveSession });
      const chatService = new ChatService();
      const httpServer = createServer((req, res) => {
        const pathname = new URL(req.url ?? '/', env.appOrigin).pathname;

        if (pathname === '/health' || pathname.startsWith('/api/v1/')) {
          api(req, res);
          return;
        }

        handle(req, res);
      });

      const io = new Server(httpServer, {
        cors: {
          origin: env.appOrigin,
          credentials: true,
        },
      });

      io.use(async (socket, next) => {
        try {
          const user = await resolveSession(socket.handshake.headers.cookie);

          if (!user) return next(new Error('Authentication required'));

          socket.data.user = user;
          return next();
        } catch (error) {
          console.error('Socket authentication failed:', error);
          return next(new Error('Authentication unavailable'));
        }
      });

      io.on('connection', (socket) => {
        socket.on('send-message', async (message) => {
          try {
            const chatMessage = await chatService.createMessage(
              socket.data.user.id,
              message
            );
            io.emit('receive-message', chatMessage);
          } catch (error) {
            console.error('Failed to send message:', error);
          }
        });
      });

      httpServer.listen(env.port, () => {
        console.log(`Server running on ${env.appOrigin}`);
      });
    }
  );
});
