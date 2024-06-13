const Router = require('express');
const UserController = require('../controllers/user.controller');
const { hashPass } = require('../middlewares/hashPassword');

const userRouter = Router();

// POST http://localhost:5001/api/users/sign-up
userRouter.post('/sign-up', hashPass, UserController.registrationUser);
// POST http://localhost:5001/api/users/sign-in
userRouter.post('/sign-in', UserController.loginUser);

module.exports = userRouter;