const http = require('http');
const app = require('./app');
const initSocket = require('./socket');

const PORT = process.env.PORT || 5001;

const server = http.createServer(app);

const io = initSocket(server);

// Додавання обʼєкту io в середовище Express
app.set('io', io);

server.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});