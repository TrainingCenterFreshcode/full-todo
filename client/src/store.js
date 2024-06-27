import { legacy_createStore as createStore } from 'redux'; // npm i redux react-redux
import reducer from './reducer';

const store = createStore(reducer);

export default store;