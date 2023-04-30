const userDao = require('../models/user');
const BaseError = require('../utils/baseError');
const jwt = require('jsonwebtoken');
const secret = 'abcdefg';

const userLogin = async (id, pw) => {
  const checkId = await userDao.checkId(id);
  const checkPw = await userDao.checkPw(pw);
  if (!checkId[0] || !checkPw[0]) throw new BaseError('Unauthorized', 401);
  const getUserIdById = await userDao.getUserIdById(id);
  const userId = getUserIdById[0].user_id;
  const accessTokenPayload = {
    userId: userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  const refreshTokenPayload = {
    userId: userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  };

  const algorithm = 'HS256';

  const accessToken = jwt.sign(accessTokenPayload, secret, {
    algorithm,
  });

  const refreshToken = jwt.sign(refreshTokenPayload, secret, {
    algorithm,
  });

  await userDao.createRefreshTokenForUser(userId, refreshToken);

  return {
    accessToken,
    accessTokenExp: Math.floor(Date.now() / 1000) + 60 * 60,
    refreshToken,
    refreshTokenExp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  };
};
module.exports = {
  userLogin,
};
