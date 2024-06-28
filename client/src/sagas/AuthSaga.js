import { registerUser, loginUser } from "../api/axiosApi";
import { loginUserSuccess, loginUserError, registerUserSuccess, registerUserError } from "../actions/actionCreator";
import { put } from 'redux-saga/effects';
import history from "../BrowserHistory";

export function* loginSaga(action) {
  try {
    const { data: { data } } = yield loginUser(action.payload);

    yield put(loginUserSuccess(data));
    history.push('/tasks');
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* registerSaga(action) {
  try {
    const { data: { data } } = yield registerUser(action.payload);

    yield put(registerUserSuccess(data));
    history.push('/tasks');
  } catch (error) {
    yield put(registerUserError(error));
  }
}