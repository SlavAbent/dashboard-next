const { createServer } = require('http');
const next = require('next');

const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
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

        firstName: message.firstName,

        lastName: message.lastName,

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
