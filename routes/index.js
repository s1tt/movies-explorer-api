const router = require('express').Router();
const routerUser = require('./user');
const routerMovie = require('./movie');
const { login, createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');
const { URLNotFound } = require('../utils/constants');
const NotFound = require('../errors/notFoundError');

const {
  loginValidation,
  userValidation,
} = require('../middlewares/validation');

router.post('/api/signin', loginValidation, login);

router.post('/api/signup', userValidation, createUser);

router.use(auth);
router.use('/api/users', routerUser);
router.use('/api/movies', routerMovie);

router.all('*', (req, res, next) => {
  next(new NotFound(URLNotFound));
});
module.exports = router;
