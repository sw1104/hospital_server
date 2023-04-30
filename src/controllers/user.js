const { refreshAccessToken } = require('../middlewares/refresh');
const userService = require('../services/user');

const userLogin = async (req, res) => {
  const { id, pw } = req.body;

  const data = await userService.userLogin(id, pw);

  res.status(201).json({ message: 'Success', data: data });
};

const accessTokenReissuance = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const accessToken = refreshAccessToken(refreshToken);
  res.status(200).json({ accessToken: accessToken });
};

module.exports = {
  userLogin,
  accessTokenReissuance,
};
