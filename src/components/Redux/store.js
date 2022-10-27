import {createStore} from 'react-redux';
import userReducer from './reducer';

const placeStore = createStore((userReducer, {}) => ({}));

export default placeStore;
