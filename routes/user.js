const routerUser = require('express').Router();

const {
  updateProfileValidation,
} = require('../middlewares/validation');

const {
  getUser,
  updateProfile,
} = require('../controllers/user');

routerUser.get('/me', getUser);

routerUser.patch('/me', updateProfileValidation, updateProfile);

module.exports = routerUser;
