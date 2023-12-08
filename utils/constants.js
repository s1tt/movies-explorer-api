const badRequestText = 'Переданы некорректные данные';
const movieNotFoundText = 'Фильм не найден';
const accessErrorText = 'Нельзя удалить чужой фильм';
const filmDeletedText = 'Фильм успешно удален';
const emailAlredyExistsText = 'Пользователь с таким email уже существует';
const userNotFoundText = 'Пользователь не найден';
const authErrorText = 'Необходима авторизация';
const internalServerErrorText = 'На сервере произошла ошибка';
const invalidURLText = 'Некорректная ссылка';
const invalidPasswordOrEmailText = 'Неправильные почта или пароль';
const URLNotFound = 'Страница с таким URL не найдена';

const DATABASE = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  badRequestText,
  movieNotFoundText,
  accessErrorText,
  filmDeletedText,
  emailAlredyExistsText,
  userNotFoundText,
  authErrorText,
  internalServerErrorText,
  invalidURLText,
  invalidPasswordOrEmailText,
  URLNotFound,
  DATABASE,
};
