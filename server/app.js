const express = require('express');
const cors = require('cors');
const router = require('./routes');
const { errorHandler } = require('./errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
// localhost:5001/api/  ---> router (routes/index.js)
app.use('/api', router);

// POST http://localhost:5001/example/counter
app.post('/example/counter', async (req, res, next) => {
  const { body: { counter } } = req;
  console.log('На сервер прийшов запит на тестовий роут!!!');
  return res.status(200).send({ ServerResponse: counter });
});

app.use(errorHandler);

module.exports = app;