import ACTION_TYPES from '../actions/actionTypes';

const initialState = {
  isLightMode: true
}

const themesReducer = (state = initialState, action) => {
  switch(action.type) {
    case ACTION_TYPES.TOGGLE_THEME: {
      return {
        ...state,
        isLightMode: !state.isLightMode
      }
    }
    default: return state;
  }
}

export default themesReducer;