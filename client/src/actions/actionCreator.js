import ACTION_TYPES from './actionTypes';

export const authUserRequest = () => {
  return {
    type: ACTION_TYPES.AUTH_USER_REQUEST
  };
};

export const authUserSuccess = (payload) => {
  return {
    type: ACTION_TYPES.AUTH_USER_SUCCESS,
    payload
  };
};

export const authUserError = (payload) => {
  return {
    type: ACTION_TYPES.AUTH_USER_ERROR,
    payload
  };
};

export const logOutRequest = () => {
  return {
    type: ACTION_TYPES.LOG_OUT_REQUEST
  };
};

export const loginUserRequest = (payload) => {
  return {
    type: ACTION_TYPES.LOGIN_USER_REQUEST,
    payload
  };
};

export const loginUserSuccess = (payload) => {
  return {
    type: ACTION_TYPES.LOGIN_USER_SUCCESS,
    payload
  };
};

export const loginUserError = (payload) => {
  return {
    type: ACTION_TYPES.LOGIN_USER_ERROR,
    payload
  };
};

export const registerUserRequest = (payload) => {
  return {
    type: ACTION_TYPES.REGISTER_USER_REQUEST,
    payload
  };
};

export const registerUserSuccess = (payload) => {
  return {
    type: ACTION_TYPES.REGISTER_USER_SUCCESS,
    payload
  };
};

export const registerUserError = (payload) => {
  return {
    type: ACTION_TYPES.REGISTER_USER_ERROR,
    payload
  };
};

export const getTasksRequest = () => {
  return {
    type: ACTION_TYPES.GET_TASKS_REQUEST
  };
};

export const getTasksSuccess = (payload) => {
  return {
    type: ACTION_TYPES.GET_TASKS_SUCCESS,
    payload
  };
};

export const getTasksError = (payload) => {
  return {
    type: ACTION_TYPES.GET_TASKS_ERROR,
    payload
  };
};

export const createTaskRequest = (payload) => {
  return {
    type: ACTION_TYPES.CREATE_TASK_REQUEST,
    payload
  };
};

export const createTaskSuccess = (payload) => {
  return {
    type: ACTION_TYPES.CREATE_TASK_SUCCESS,
    payload
  };
};

export const createTaskError = (payload) => {
  return {
    type: ACTION_TYPES.DELETE_TASK_ERROR,
    payload
  };
};

export const deleteTaskRequest = (payload) => {
  return {
    type: ACTION_TYPES.DELETE_TASK_REQUEST,
    payload
  };
};

export const deleteTaskSuccess = (payload) => {
  return {
    type: ACTION_TYPES.DELETE_TASK_SUCCESS,
    payload
  };
};

export const deleteTaskError = (payload) => {
  return {
    type: ACTION_TYPES.DELETE_TASK_ERROR,
    payload
  };
};