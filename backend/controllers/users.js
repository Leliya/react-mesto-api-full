const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const DoubleEmailError = require('../errors/doubling-error');
const IncorrectDataError = require('../errors/incorrect-data-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ user }))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(
    req.params.userId,
  )
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new IncorrectDataError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id).orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.send({ user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => {
        const userConfidential = user.toObject({ useProjection: true });
        res.send({ userConfidential });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return next(new IncorrectDataError('Переданы некорректные данные'));
        }
        if (err.code === 11000) {
          return next(new DoubleEmailError('Пользователь с таким email уже зарегистрирован'));
        }
        return next(err);
      });
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      return next(new IncorrectDataError('Переданы некорректные данные'));
    }
    return next(err);
  });
};

const updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    { new: true, runValidators: true },
  ).orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new IncorrectDataError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new IncorrectDataError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password).then((user) => {
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
    return res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
      .send({ email, password });
  })
    .catch(next);
};

const unlogin = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли из профиля' });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
  unlogin,
};
