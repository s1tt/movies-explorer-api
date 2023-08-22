const routerMovie = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

routerMovie.get('/', getMovies);

routerMovie.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.number().required(),
    year: Joi.string().min(2).max(30).required(),
    description: Joi.string().min(2).max(300).required(),
    image: Joi.string().uri().required(),
    trailerLink: Joi.string().uri().required(),
    nameRU: Joi.string().min(2).max(30).required(),
    nameEN: Joi.string().min(2).max(30).required(),
    thumbnail: Joi.string().uri().required(),
    movieId: Joi.number().required(),
  }),
}), createMovie);

routerMovie.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
}), deleteMovie);

module.exports = routerMovie;
