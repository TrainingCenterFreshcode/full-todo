const { verifyAccessToken } = require('../services/createSession');
const RefreshTokenError = require('../errors/RefreshTokenError');

module.exports.checkToken = async (req, res, next) => {
  try {
    const { headers: { authorization } } = req;

    if(!authorization) {
      throw new RefreshTokenError('Need authentication');
    }

    const [, token] = authorization.split(' ');
    
    const payload = await verifyAccessToken(token);
    
    req.tokenPayload = payload;

    next();
  } catch (error) {
    next(error);
  }
}