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
  const httpServer = createServer(handle);

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  const port = Number(process.env.PORT ?? 3000);

  io.use(async (socket, next) => {
    try {
      const cookie = socket.handshake.headers.cookie;

      if (!cookie) {
        return next(new Error('Authentication required'));
      }

      const sessionResponse = await fetch(
        `http://localhost:${port}/api/auth/session`,
        { headers: { cookie } }
      );

      const session = await sessionResponse.json();

      if (!sessionResponse.ok || !session?.user?.id) {
        return next(new Error('Authentication required'));
      }

      socket.data.user = session.user;
      return next();
    } catch (error) {
      console.error('Socket authentication failed:', error);
      return next(new Error('Authentication unavailable'));
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('send-message', async (message) => {
      try {
        const text =
          typeof message?.text === 'string' ? message.text.trim() : '';

        if (!text || text.length > 2000) {
          throw new Error('Message must contain 1-2000 characters');
        }

        const user = socket.data.user;
        const newMessage = {
          id: crypto.randomUUID(),
          text,
          userId: user.id,
          createdAt: new Date().toISOString(),
          author: {
            id: user.id,
            firstName: user.name?.split(' ')[0] ?? 'User',
            lastName: user.name?.split(' ').slice(1).join(' ') ?? '',
          },
        };

        const messageResponse = await fetch('http://localhost:4001/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMessage),
        });

        if (!messageResponse.ok) {
          throw new Error(`Failed to save message: ${messageResponse.status}`);
        }

        const chatMessage = {
          id: newMessage.id,
          text: newMessage.text,
          userId: newMessage.userId,
          createdAt: newMessage.createdAt,
          author: newMessage.author,
        };

        console.log('CHAT MESSAGE TO CLIENT:', chatMessage);

        io.emit('receive-message', chatMessage);
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  httpServer.listen(port, () => {
    console.log('Server running on http://localhost:3000');
  });
});
