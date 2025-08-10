import { Server } from 'socket.io';

let io;

/**
 * Initializes the Socket.IO server.
 * @param {http.Server} server
 */
export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*', 
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Socket connected', socket.id);

    // joinGame: payload { gameId, userId }
    socket.on('joinGame', async ({ gameId, userId }) => {
      try {
        if (!gameId || !userId) {
          socket.emit('ERROR', { message: 'gameId and userId are required to join.' });
          return;
        }

        const room = `game_${gameId}`;
        socket.join(room);

        // save userId and gameId in socket data for later use
        socket.data.userId = userId;
        socket.data.gameId = gameId;

        // notify other clients in the room
        io.to(room).emit('PLAYER_JOINED', { userId });

        console.log(`Socket ${socket.id} joined room ${room}`);
      } catch (err) {
        console.error('Error in joinGame handler', err);
      }
    });

    // leaveGame: payload { gameId, userId }
    socket.on('leaveGame', ({ gameId, userId }) => {
      const room = `game_${gameId}`;
      socket.leave(room);
      io.to(room).emit('PLAYER_LEFT', { userId });
      console.log(`Socket ${socket.id} left room ${room}`);

      delete socket.data.gameId;
      delete socket.data.userId;
    });

    socket.on('disconnect', () => {
      const { userId, gameId } = socket.data || {};
      if (userId && gameId) {
        const room = `game_${gameId}`;
        io.to(room).emit('PLAYER_LEFT', { userId });
      }
      console.log('Socket disconnected', socket.id);
    });
  });
}

/**
 * Getter for the Socket.IO instance.
 */
export function getIO() {
  if (!io) throw new Error('Socket.io not initialized. Call initSocket(server) first.');
  return io;
}