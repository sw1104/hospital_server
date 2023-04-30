const { appDataSource } = require('../../db');

const getUserIdById = async id => {
  const [result] = await appDataSource.query(
    `
      SELECT user_id FROM user WHERE id = "${id}";
    `
  );
  return result;
};

const checkId = async id => {
  const [result] = await appDataSource.query(
    `
      SELECT id FROM user WHERE id = "${id}";
    `
  );

  return result;
};

const checkPw = async pw => {
  const [result] = await appDataSource.query(
    `
      SELECT id FROM user WHERE pw = "${pw}";
    `
  );

  return result;
};

const createRefreshTokenForUser = async (userId, refresh) => {
  return await appDataSource.query(
    `
      UPDATE user SET
      refresh = '${refresh}'
      WHERE user_id = ${userId}
    `
  );
};

const getRefreshTokenById = async userId => {
  return await appDataSource.query(
    `
      SELECT refresh FROM user WHERE user_id = ${userId}
    `
  );
};
module.exports = {
  getUserIdById,
  checkId,
  checkPw,
  createRefreshTokenForUser,
  getRefreshTokenById,
};
