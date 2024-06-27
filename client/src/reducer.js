import ACTION_TYPES from './actions/actionTypes';

const initialState = {
  counter: 0,
  step: 1,
  isFetching: false,
  serverResponse: null,
  error: null
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ACTION_TYPES.INCREMENT: {
      return {
        ...state,
        counter: state.counter + state.step
      }
    }
    case ACTION_TYPES.DECREMENT: {
      return {
        ...state,
        counter: state.counter - state.step
      }
    }
    case ACTION_TYPES.STEP_CHANGE: {
      const { payload } = action;
      return {
        ...state,
        step: payload
      }
    }
    case ACTION_TYPES.REQUEST_COUNTER_FETCHING: {
      return {
        ...state,
        isFetching: true
      }
    }
    case ACTION_TYPES.REQUEST_COUNTER_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        serverResponse: payload,
        isFetching: false
      }
    }
    case ACTION_TYPES.REQUEST_COUNTER_ERROR: {
      const { payload } = action;
      return {
        ...state,
        error: payload,
        isFetching: false
      }
    }
    default: return state;
  }
}

export default reducer;