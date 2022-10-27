import {combineReducers} from 'redux';
import {GET_PLACES} from './type';

const INITIAL_STATE = {
  places: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PLACES:
      return {...state, places: action.payload};
    default:
      return state;
  }
};

export default combineReducers({
  allReducers: userReducer,
});
