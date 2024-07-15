const { Server } = require('socket.io');

const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*'
    }
  });

  io.on('connection', (socket) => { // socket - об єкт, за допомогою якого ми можемо управляти вебсокет з єднанням
    console.log('CONNECTION');
  
    // задача: кожні 5 секунд відправляти на клієнт якесь повідомлення
    setTimeout(() => {
      io.emit('NEW_NOTIFICATION', { notification: `Current time: ${Date.now()}` });
    }, 5000);
  
    socket.on('disconnect', (reason) => {
      console.log(reason);
    });
  });

  return io;
}

module.exports = initSocket;