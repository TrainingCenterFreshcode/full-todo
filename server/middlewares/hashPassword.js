const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../configs/constants');
const EmptyUserError = require('../errors/EmptyUserError');

module.exports.hashPass = async (req, res, next) => {
  try {
    if(Object.keys(req.body).length === 0) {
      throw new EmptyUserError('User cannot be empty');
    }

    const { body, body: { password } } = req;

    req.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    delete body.password;

    next();
  } catch (error) {
    next(error);
  }
}



/*

qwerty1234
--->>>
17f80754644d33ac685b0842a402229adbb43fc9312f7bdf36ba24237a1f1ffb

Особливості хеш-функцій:
1. Хеші завжди унікальні для кожного масиву інформації.
2. Хешування - незворотна операція.
3. Хешування працює досить швидко.
4. Алгоритми роботи хеш-функцій - відкриті.
5. Довжина хешу буде завжди однакова.



Реєстрація користувача

1. Користувач заповнює форму реєстрації, включаючи поле пароль
2. Пароль обробляється хеш-функцією та поміщається до БД

Вхід користувача

1. Користуч заповнює форму логіну, включаючи поле пароль
2. Пароль обробляється хеш-функцією та співстається з хешем з БД

- Оригільне значення пароля ніде не використовується


bcrypt

Основні переваги bcrypt
1. Рівень безпеки: використовуються солі і раунди.
2. Повільність.
3. Налаштування.

Сіль - це додаткові унікальні дані, які додаються до паролю.
Ітерація - багаторазове хешування.
1 ітерація = 1 раунд

*/