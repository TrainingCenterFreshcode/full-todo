const Router = require('express');
const TaskController = require('../controllers/task.controller');

const taskRouter = Router();

// POST http://localhost:5001/api/tasks/
taskRouter.post('/', TaskController.createUserTask);
// GET http://localhost:5001/api/tasks/:userId
taskRouter.get('/:userId', TaskController.getAllUserTasks);

module.exports = taskRouter;