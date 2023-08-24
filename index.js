const express = require('express');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/index');
const { DATABASE } = require('./utils/constants');

const { PORT, DB_URL = DATABASE } = process.env;

mongoose.connect(DB_URL);
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger); // подключаем логгер запросов

app.use(router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
