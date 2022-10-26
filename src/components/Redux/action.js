export const GET_PLACES = 'GET_STATE';

const API_URL =
  'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=malaysia&types=establishment&location=3.163504%2C101.656995&radius=500&key=YOUR_API_KEY';

export const getPlaceReponse = () => {
  try {
    return async dispatch => {
      const result = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const json = await result.json();
      if (json) {
        dispatch({
          type: GET_PLACES,
          payload: json,
        });
      } else {
        console.log('UNAVAILABLE');
      }
    };
  } catch (error) {
    console.log('ERROR HEREE', error);
  }
};
