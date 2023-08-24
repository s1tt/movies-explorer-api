const Movie = require('../models/movie');

const BadRequest = require('../errors/badRequestError');
const NotFound = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const {
  badRequestText,
  movieNotFoundText,
  accessErrorText,
  filmDeletedText,
} = require('../utils/constants');

// возвращает все сохранённые текущим пользователем фильмы
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

/*
Cоздаёт фильм с переданными в теле:
country, director, duration, year, description,
image, trailerLink, nameRU, nameEN и thumbnail, movieId
*/
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const { _id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: _id,
  })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(badRequestText));
      } else {
        next(err);
      }
    });
};

// удаляет сохранённый фильм по id
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        next(new NotFound(movieNotFoundText));
        return;
      }
      if (req.user._id.toString() !== movie.owner.toString()) {
        next(new ForbiddenError(accessErrorText));
        return;
      }
      movie.deleteOne()
        .then(() => {
          res.send({ message: filmDeletedText });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(badRequestText));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
