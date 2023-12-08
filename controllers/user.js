const { NODE_ENV, SECRET_KEY } = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const BadRequest = require("../errors/badRequestError");
const NotFound = require("../errors/notFoundError");
const ConflictError = require("../errors/conflictError");
const UnauthorizedError = require("../errors/unauthorizedError");

const {
  badRequestText,
  emailAlredyExistsText,
  userNotFoundText,
  invalidPasswordOrEmailText,
} = require("../utils/constants");

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? SECRET_KEY : "some-secret-key",
        { expiresIn: "7d" }
      );
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError(invalidPasswordOrEmailText));
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFound(userNotFoundText));
        return;
      }
      res.send({ email: user.email, name: user.name });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.send({
        email: user.email,
        name: user.name,
        _id: user._id,
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(emailAlredyExistsText));
      } else if (err.name === "ValidationError") {
        next(new BadRequest(badRequestText));
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        next(new NotFound(userNotFoundText));
        return;
      }
      res.send({ email, name });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequest(badRequestText));
      } else if (err.code === 11000) {
        next(new ConflictError(emailAlredyExistsText));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  getUser,
  updateProfile,
  login,
};
