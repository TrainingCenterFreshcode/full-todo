import ACTION_TYPES from './actions/actionTypes';

const initialState = {
  counter: 0
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ACTION_TYPES.INCREMENT: {
      return {
        ...state,
        counter: state.counter + 1
      }
    }
    case ACTION_TYPES.DECREMENT: {
      return {
        ...state,
        counter: state.counter - 1
      }
    }
    default: return state;
  }
}

export default reducer;