const mongoose = require('mongoose');
const { DB } = require('../configs/db');
const User = require('./User');
const Task = require('./Task');

async function start() {
  await mongoose.connect(DB)
  .catch(err => {
    console.log(`Connect failed: ${err.message}`);
  });
}
start();

module.exports = {
  User, Task
}