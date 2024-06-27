import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import themesReducer from './themesReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  themes: themesReducer
});

export default rootReducer;