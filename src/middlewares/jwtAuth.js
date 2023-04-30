const jwt = require('jsonwebtoken');
const BaseError = require('../utils/baseError');

const secret = 'abcdefg';

const authenticateToken = async (req, res, next) => {
  const token = req.header('accessToken');
  if (token === null) throw new BaseError('Unauthorized', 401);

  jwt.verify(token, secret, (err, decoded) => {
    if (err) throw new BaseError('Unauthorized', 401);
    next();
  });
};

module.exports = {
  authenticateToken,
};
