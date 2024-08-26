const socketio = require('socket.io');

const initSocket = (server) => {
  const io = socketio(server);

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    // Example: Broadcasting event updates
    socket.on('updateEvent', (event) => {
      socket.broadcast.emit('eventUpdated', event);
    });
  });

  return io;
};

module.exports = initSocket;
