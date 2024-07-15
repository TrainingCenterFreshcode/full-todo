import { registerUser, loginUser, authUser, logOut } from '../api/axiosApi';
import { authByQRCode } from '../api/authByQRCodeApi';
import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  authUserSuccess,
  authUserError,
  authByQRCodeSuccess,
  authByQRCodeError
} from '../actions/actionCreator';
import { put } from 'redux-saga/effects';
import history from '../BrowserHistory';

export function* loginSaga(action) {
  try {
    const {
      data: { data },
    } = yield loginUser(action.payload);

    yield put(loginUserSuccess(data));
    history.push('/tasks');
  } catch (error) {
    yield put(loginUserError(error.response.data.error));
  }
}

export function* registerSaga(action) {
  try {
    const {
      data: { data },
    } = yield registerUser(action.payload);

    yield put(registerUserSuccess(data));
    history.push('/tasks');
  } catch (error) {
    yield put(registerUserError(error.response.data.error));
  }
}

export function* authSaga() {
  try {
    const {
      data: { data },
    } = yield authUser();

    yield put(authUserSuccess(data));
  } catch (error) {
    yield put(authUserError(error));
  }
}

export function* logOutSaga() {
  yield logOut();
  history.push('/');
}

export function* authByQRCodeSaga(action) {
  try {
    // 1 дія: робимо запит на АПІ
    const { data } = yield authByQRCode({
      refreshToken: action.payload
    });

    // 2 дія: отримані токени записуємо в localStorage користувача
    const { tokens: { accessToken, refreshToken } } = data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    // 3 дія: перенаправляємось на компоненту, яка використає токени і відобразить таски користувача
    history.push('/tasks');

    yield put(authByQRCodeSuccess(data));
  } catch (error) {
    yield put(authByQRCodeError(error));
  }
}