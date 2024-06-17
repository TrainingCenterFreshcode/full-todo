const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const promisifyJWTSign = promisify(jwt.sign);
const promisifyJWTVerify = promisify(jwt.verify);

const EXPIRES_TIME = 60 * 60; // "1h"

const secret = 'Euro-2024';

module.exports.createToken = async ({ userId, email }) => await promisifyJWTSign({ userId, email }, secret, {
  expiresIn: EXPIRES_TIME
});

module.exports.verifyToken = async (token) => await promisifyJWTVerify(token, secret);