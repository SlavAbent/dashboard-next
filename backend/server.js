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

  io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    socket.on('send-message', async (message) => {
      const newMessage = {
        id: crypto.randomUUID(),
        text: message.text,
        userId: message.userId,
        createdAt: message.createdAt,
      };

      await fetch('http://localhost:4001/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });

      io.emit('receive-message', newMessage);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  httpServer.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});
