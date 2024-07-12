const { User, RefreshToken } = require('../models');
const bcrypt = require('bcrypt');
const NotFoundError = require('../errors/NotFound');
const RefreshTokenError = require('../errors/RefreshTokenError');
const {
  createAccessToken,
  verifyAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require('../services/createSession');

module.exports.registrationUser = async (req, res, next) => {
  try {
    const { body, passwordHash } = req;

    const createdUser = await User.create({ ...body, passwordHash });

    const accessToken = await createAccessToken({
      userId: createdUser._id,
      email: createdUser.email,
    });

    const refreshToken = await createRefreshToken({
      userId: createdUser._id,
      email: createdUser.email,
    });

    return res.status(201).send({ data: createdUser, tokens: { accessToken, refreshToken } });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    // 1. Дістати з тіла http-запиту на логін: email, password
    const { body } = req;

    // 2. Перевіряємо, а чи є у нас користувач з таким імейлом
    const foundUser = await User.findOne({
      email: body.email,
    });

    // 3. Якщо у нас є користувач з таким імейлом - ми перевіряємо пароль, чи правильний він
    // Якщо пароль вірний - логінимо користувача
    // Якщо пароль не вірний - викидуємо помилку

    if (foundUser) {
      const result = await bcrypt.compare(
        body.password,
        foundUser.passwordHash
      );
      
      if (!result) {
        throw new NotFoundError('Incorrect password');
      }

      const accessToken = await createAccessToken({
        userId: foundUser._id,
        email: foundUser.email,
      });

      const refreshToken = await createRefreshToken({
        userId: foundUser._id,
        email: foundUser.email,
      });

      await RefreshToken.create({
        token: refreshToken,
        userId: foundUser._id,
      });
      return res
        .status(200)
        .send({ data: foundUser, tokens: { accessToken, refreshToken } });
    } else {
      throw new NotFoundError('Incorrect email');
    }
  } catch (error) {
    next(error);
  }
};

module.exports.checkAuth = async (req, res, next) => {
  try {
    const {
      tokenPayload: { userId },
    } = req;

    const foundUser = await User.findOne({
      _id: userId,
    });

    return res.status(200).send({ data: foundUser });
  } catch (error) {
    next(error);
  }
};

module.exports.refreshSession = async (req, res, next) => {
  const {
    body: { refreshToken },
  } = req;

  let verifyResult;

  try {
    // перевіряємо, чи взагалі валідний refresh token
    verifyResult = await verifyRefreshToken(refreshToken);
  } catch (error) {
    const newError = new RefreshTokenError('Invalid refresh token');
    return next(newError);
  }

  try {
    // виконується логіка оновлення сессії
    /*

    Access token
    Живе мало, багаторазовий. Саме цим токеном ми і будемо супроводжувати всі наші запити

    Refresh token
    Живе багато, одноразовий. Призначений для оновлення пари токенів.


    Приходить запит з АТ
      - АТ валідний, виконуємо запит
      - АТ невалідний
        1. Відповідаємо певним кодом помилки
        2. У відповідь на цю помилку, фронт надсилає РТ
          - Якщо РТ валідний - рефрешимо сесію, видаємо нову пару токенів
          - Якщо РТ невалідний - відправляємо користувача на аутенфікацію

    */
    if (verifyResult) {
      const user = await User.findOne({ _id: verifyResult.userId });
      const oldRefreshTokenFromDB = await RefreshToken.findOne({
        $and: [{ token: refreshToken }, { userId: user._id }],
      });

      if (oldRefreshTokenFromDB) {
        await RefreshToken.deleteOne({
          $and: [{ token: refreshToken }, { userId: user._id }],
        });

        const newAccessToken = await createAccessToken({
          userId: user._id,
          email: user.email,
        });

        const newRefreshToken = await createRefreshToken({
          userId: user._id,
          email: user.email,
        });

        await RefreshToken.create({
          token: newRefreshToken,
          userId: user._id,
        });

        return res.status(200).send({
          tokens: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        });
      }
    } else {
      throw new RefreshTokenError('Token not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports.createNewTokenPairByQRCodeAuth = async (req, res, next) => {
  try {
    const { body: { refreshToken } } = req;
    const verifyResult= await verifyRefreshToken(refreshToken);
    if (verifyResult) {
      const user = await User.findOne({ _id: verifyResult.userId });
      const oldRefreshTokenFromDB = await RefreshToken.findOne({
        $and: [{ token: refreshToken }, { userId: user._id }],
      });

      if (oldRefreshTokenFromDB) {
        const newAccessToken = await createAccessToken({
          userId: user._id,
          email: user.email,
        });

        const newRefreshToken = await createRefreshToken({
          userId: user._id,
          email: user.email,
        });

        await RefreshToken.create({
          token: newRefreshToken,
          userId: user._id,
        });

        return res.status(200).send({
          tokens: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        });
      }
    } else {
      throw new RefreshTokenError('Token not found');
    }
  } catch (error) {
    next(error);
  }
};
