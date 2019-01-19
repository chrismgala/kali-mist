import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from './index';
import * as types from '../constants/ActionTypes';
import * as config from '../constants/config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should create an action to request the location', () => {
    const coords = { latitude: 33.7411707, longitude: -117.7769278 };
    const expectedAction = {
      type: types.REQUEST,
      coords
    };
    expect(actions.requestLocation(coords)).toEqual(expectedAction);
  });

  it('should create an action to receive the location', () => {
    const coords = { latitude: 33.7411707, longitude: -117.7769278 };
    const json = {
      data: {
        location: {
          name: 'Irvine, CA',
          city: 'Irvine',
          state: 'California',
          state_abv: 'CA',
          zipcode: '92618',
          country: 'United States',
          country_code: 'US',
          latitude: 33.666614,
          longitude: -117.756295,
          place_path: '/earth/us/ca/irvine/92618',
          is_medical: true,
          is_recreational: true,
          quote: 'Medically Legal Since 1996',
          cta_message: null,
          min_age: 18
        }
      }
    };
    const expectedAction = {
      type: types.RECEIVE,
      coords,
      json
    };
    expect(actions.receiveLocation(coords, json)).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates RECEIVING when fetching locations has been done', () => {
    const json = {
      data: {
        regions: {
          brand: {
            id: 1319,
            name: 'South OC Brands',
            slug: 'south-oc-brands',
            region_path: 'united-states/california/orange-county/south-oc-brands',
            latitude: 33.51959991455078,
            longitude: -117.7403717041016,
            top_left: {
              latitude: 33.85132,
              longitude: -118.607339
            },
            bottom_right: {
              latitude: 32.800601,
              longitude: -117.450531
            }
          },
          deal: {
            id: 166,
            name: 'Irvine',
            slug: 'lake-forest',
            region_path: 'united-states/california/lake-forest',
            latitude: 33.6833610534668,
            longitude: -117.7663879394531,
            top_left: {
              latitude: 33.778546,
              longitude: -117.8695
            },
            bottom_right: {
              latitude: 33.599185,
              longitude: -117.670184
            }
          }
        }
      }
    };
    fetchMock.getOnce(`https://${config.API_HOST}/wm/v2/location?include[]=regions.listings&latlng=33.7411707,-117.7769278`, {
      body: { data: json },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const coords = { latitude: 33.7411707, longitude: -117.7769278 };
    const expectedActions = [
      { type: types.REQUEST, coords },
      { type: types.RECEIVE, coords, json }
    ];
    const store = mockStore({ location: {}, regions: {} });

    return store.dispatch(actions.locate(coords)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
