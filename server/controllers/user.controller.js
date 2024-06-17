const { User } = require("../models");
const bcrypt = require('bcrypt');
const NotFoundError = require('../errors/NotFound');
const { createToken, verifyToken } = require('../services/createSession');

module.exports.registrationUser = async (req, res, next) => {
  try {
    const { body, passwordHash } = req;

    const createdUser = await User.create({ ...body, passwordHash });

    const token = await createToken({ userId: foundUser._id, email: foundUser.email });
    
    return res.status(201).send({ data: createdUser, tokens: { token } });
  } catch (error) {
    next(error);
  }
}

module.exports.loginUser = async (req, res, next) => {
  try {
    // 1. Дістати з тіла http-запиту на логін: email, password
    const { body } = req;

    // 2. Перевіряємо, а чи є у нас користувач з таким імейлом
    const foundUser = await User.findOne({
      email: body.email
    });

    // 3. Якщо у нас є користувач з таким імейлом - ми перевіряємо пароль, чи правильний він
    // Якщо пароль вірний - логінимо користувача
    // Якщо пароль не вірний - викидуємо помилку

    if(foundUser) {
      const result = await bcrypt.compare(body.password, foundUser.passwordHash);
      if(!result) {
        throw new NotFoundError('Incorrect password');
      }
      const token = await createToken({ userId: foundUser._id, email: foundUser.email });
      return res.status(200).send({ data: foundUser, tokens: { token } });
    } else {
      throw new NotFoundError('Incorrect email');
    }
  } catch (error) {
    next(error);
  }
}

module.exports.checkToken = async (req, res, next) => {
  try {
    const { params: { token } } = req;
    const payload = await verifyToken(token);
    
    const foundUser = await User.findOne({
      _id: payload.userId
    });

    return res.status(200).send({ data: foundUser });
  } catch (error) {
    next(error);
  }
}