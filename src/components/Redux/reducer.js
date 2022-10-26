import {combineReducers} from 'redux';
import {GET_PLACES} from './action';

const initialState = {
  placeName: '',
};

function gettingNamePlace(state = initialState, action) {
  switch (action.type) {
    case GET_PLACES:
      return {
        ...state,
        placeName: action.payload,
      };
    // other cases ...
    default:
      return state;
  }
}

export default gettingNamePlace;
