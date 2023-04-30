const jwt = require('jsonwebtoken');
const secret = 'abcdefg';

const refreshAccessToken = refreshToken => {
  const decoded = jwt.verify(refreshToken, secret);
  const userId = decoded.userId;
  const algorithm = 'HS256';
  const accessTokenPayload = {
    userId: userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };
  const accessToken = jwt.sign(accessTokenPayload, secret, {
    algorithm,
  });

  return accessToken;
};

module.exports = {
  refreshAccessToken,
};
