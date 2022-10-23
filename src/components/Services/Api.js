import axios from 'axios';
import {apiKey} from './config';
// our "constructor"
const create = () => {
  //Google API
  const getLocationFromGoogle = (lat, long) => {
    return axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`,
    );
  };
  return {
    getLocationFromGoogle,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
