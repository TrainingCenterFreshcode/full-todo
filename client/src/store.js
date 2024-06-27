import { legacy_createStore as createStore } from 'redux'; // npm i redux react-redux
import rootReducer from './reducers';

const store = createStore(rootReducer);

export default store;