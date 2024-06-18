const { verifyToken } = require('../services/createSession');

module.exports.checkToken = async (req, res, next) => {
  try {
    const { headers: { authorization } } = req;
    const [, token] = authorization.split(' ');
    
    const payload = await verifyToken(token);
    
    req.tokenPayload = payload;

    next();
  } catch (error) {
    next(error);
  }
}