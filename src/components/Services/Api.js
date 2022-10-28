import axios from 'axios';
import {apiKey} from './config';
// our "constructor"
const create = () => {
  //Google API
  const getLocationFromGoogle = (lat, long) => {
    return axios
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=malaysia&types=establishment&location=${lat}%2${long}&radius=500&key=${apiKey}`,
      )
      .then(res => {
        const result = res;
        console.log('GET DATA :: ', result);
      });
  };
  return {
    getLocationFromGoogle,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
