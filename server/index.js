const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');

const cors = {
  origin: '*'
}

const PORT = process.env.PORT || 5001;

const server = http.createServer(app);

const io = new Server(server, cors);

io.on('connect', (socket) => { // socket - об єкт, за допомогою якого ми можемо управляти вебсокет з єднанням
  console.log('CONNECTION');

  // задача: кожні 5 секунд відправляти на клієнт якесь повідомлення
  setTimeout(() => {
    io.emit('NEW_NOTIFICATION', { notification: `Current time: ${Date.now()}` });
  }, 5000);

  socket.on('disconnect', (reason) => {
    console.log(reason);
  });
});

server.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});