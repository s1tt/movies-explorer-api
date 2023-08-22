const routerUser = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  updateProfile,
} = require('../controllers/user');

routerUser.get('/me', getUser);

routerUser.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

module.exports = routerUser;
