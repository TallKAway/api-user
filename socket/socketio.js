const socketio = require('socket.io');

const SocketEvents = require('../constants/SocketEvents');


module.exports = (http) => {
  // const io = ""
  const io = socketio(http, {
    cors: { origin: '*' },
  });
let chatApiRoom = "chatApiRoom"

  io.on(SocketEvents.CONNECT, socket => {
    // logger.info(`⚡: ${socket.id} user just connected`);

    socket.join(chatApiRoom);
    //Send this event to everyone in the room.
    io.sockets.in(chatApiRoom)
        .emit(SocketEvents.CHAT_CREATED, "User est creer ChatApiRoom");

    socket.on(SocketEvents.DISCONNECT, () => {
    //   logger.info('Facilitator DISCONNECT');
    });

  })

  return io;
};