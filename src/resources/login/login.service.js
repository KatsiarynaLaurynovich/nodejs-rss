const userRepository = require('../users/user.db.repository');
const { JWT_SECRET_KEY } = require('../../common/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUND } = require('../../common/config');

const hashPassword = async password => {
  return bcrypt.hash(password, BCRYPT_SALT_ROUND);
};

const verifyPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

const createJwt = async payload => {
  return jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: '24h'
  });
};

const getJWTToken = async data => {
  const { login, password } = data;
  const user = await userRepository.getByLogin(login);

  if (user && verifyPassword(password, user.password)) {
    return createJwt({ userId: user.id, login });
  }
  return null;
};

module.exports = { getJWTToken, hashPassword };
