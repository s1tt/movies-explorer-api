const routerMovie = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');

const {
  movieValidation,
  movieIdValidation,
} = require('../middlewares/validation');

routerMovie.get('/', getMovies);

routerMovie.post(
  '/',
  movieValidation,
  createMovie,
);

routerMovie.delete(
  '/:id',
  movieIdValidation,
  deleteMovie,
);

module.exports = routerMovie;
