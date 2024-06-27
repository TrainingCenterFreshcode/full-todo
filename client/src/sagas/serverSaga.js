import { exampleAPI } from "../api/axiosApi";
import { put } from "redux-saga/effects";
import { requestCounterSuccess, requestCounterError } from "../actions/actionCreator";

export function* createServerSaga(action) {
  try {
    const result = yield exampleAPI(action.payload);

    yield put(requestCounterSuccess(result));
  } catch (error) {
    yield put(requestCounterError(error));
  }
}