import { takeLatest } from 'redux-saga/effects';
import ACTION_TYPES from '../actions/actionTypes';
import { loginSaga, registerSaga } from './AuthSaga';
import { getTasksSaga, createTaskSaga, deleteTaskSaga } from './TasksSagas';

function* rootSaga() {
  // AUTH
  yield takeLatest(ACTION_TYPES.LOGIN_USER_REQUEST, loginSaga);
  yield takeLatest(ACTION_TYPES.REGISTER_USER_REQUEST, registerSaga);

  // TASKS
  yield takeLatest(ACTION_TYPES.GET_TASKS_REQUEST, getTasksSaga);
  yield takeLatest(ACTION_TYPES.CREATE_TASK_REQUEST, createTaskSaga);
  yield takeLatest(ACTION_TYPES.DELETE_TASK_REQUEST, deleteTaskSaga);
}

export default rootSaga;