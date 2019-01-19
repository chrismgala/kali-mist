import { REQUEST, RECEIVE } from '../constants/ActionTypes';

const locationListing = (state = { isLocating: false, location: null, regions: null }, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        isLocating: true
      };
    case RECEIVE:
      return {
        ...state,
        isLocating: false,
        location: action.json.location,
        regions: action.json.regions
      };
    default:
      return state;
  }
};

export default locationListing;
