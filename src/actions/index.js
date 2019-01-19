import * as types from '../constants/ActionTypes';
import * as config from '../constants/config';

export const requestLocation = coords => ({
  type: types.REQUEST,
  coords
});

export const receiveLocation = (coords, json) => ({
  type: types.RECEIVE,
  coords,
  json
});

export const locate = coords => (dispatch) => {
  dispatch(requestLocation(coords));
  return fetch(`https://${config.API_HOST}/wm/v2/location?include[]=regions.listings&latlng=${coords.latitude},${coords.longitude}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json(), (error) => {
    console.error('An error occurred:', error);
  })
  .then((json) => {
    dispatch(receiveLocation(coords, json.data));
  });
};
