const { Task } = require('../models');

module.exports.getAllUserTasks = async (req, res, next) => {
  try {
    const { params: { userId } } = req;

    const userTasks = await Task.find({
      authorId: userId
    });

    return res.status(200).send({ data: userTasks });
  } catch (error) {
    next(error);
  }
}

module.exports.createUserTask = async (req, res, next) => {
  try {
    const { body } = req;

    const task = await Task.create(body);

    return res.status(201).send({ data: task });
  } catch (error) {
    next(error);
  }
}