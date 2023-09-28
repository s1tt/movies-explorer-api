const { celebrate, Joi } = require("celebrate");

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
});

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(300).required(),
    director: Joi.string().min(2).max(300).required(),
    duration: Joi.number().required(),
    year: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(2).max(3000).required(),
    image: Joi.string()
      .required()
      .regex(/^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/),
    trailerLink: Joi.string()
      .required()
      .regex(/^(https?|ftp):\/\/[a-zA-Z0-9.-]+\.[a-z]{2,6}\/[^\s]*$/),
    nameRU: Joi.string().min(2).max(300).required(),
    nameEN: Joi.string().min(2).max(300).required(),
    thumbnail: Joi.string()
      .required()
      .regex(/^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/),
    movieId: Joi.number().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  loginValidation,
  userValidation,
  updateProfileValidation,
  movieValidation,
  movieIdValidation,
};
