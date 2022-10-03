require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const app = express();
const mongoose = require('mongoose');
const { auth } = require('./middlewares/auth');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { unlogin } = require('./controllers/users');
const routes = require('./routes/index');

const { handlerErrors, notFound } = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use(requestLogger);

app.use('', routes);

app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.get('/signout', unlogin);

app.use('/', notFound);

app.use(errorLogger);

app.use(errors());

app.use(handlerErrors);

app.listen(PORT);
