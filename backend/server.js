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
    console.log('User connected:', socket.id);

    socket.on('send-message', async (message) => {
      try {
        const newMessage = {
          id: crypto.randomUUID(),
          text: message.text,
          userId: message.userId,
          createdAt: message.createdAt,
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

        const userResponse = await fetch(
          `http://localhost:4001/users/${message.userId}`
        );

        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user: ${userResponse.status}`);
        }

        const user = await userResponse.json();

        const chatMessage = {
          id: newMessage.id,
          text: newMessage.text,
          userId: newMessage.userId,
          createdAt: newMessage.createdAt,
          author: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
          },
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

  httpServer.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
