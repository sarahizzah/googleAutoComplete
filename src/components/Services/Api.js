import axios from 'axios';

// our "constructor"
const create = () => {
  //Google API
  const config = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDt4J_mhbgHvgyjyIa4HUVo-c6xG6VFw1U&libraries=places&callback=initMap',
    headers: {},
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

// let's return back our create method as the default.
export default {
  create,
};
