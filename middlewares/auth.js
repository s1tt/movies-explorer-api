const { NODE_ENV, SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

const {
  authErrorText,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(authErrorText));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedError(authErrorText));
    return;
  }

  req.user = payload;

  next();
};
