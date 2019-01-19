import locationListing from './location';
import * as types from '../constants/ActionTypes';

describe('location reducer', () => {
  it('should return the initial state', () => {
    expect(locationListing(undefined, {})).toEqual({
      isLocating: false,
      location: null,
      regions: null
    });
  });

  it('should handle REQUESTING', () => {
    expect(
      locationListing({}, {
        type: types.REQUEST,
        coords: { latitude: 33.7411707, longitude: -117.7769278 }
      })
    ).toEqual({
      isLocating: true
    });
  });

  it('should handle RECEIVING', () => {
    expect(
      locationListing({
        isLocating: true,
        location: null,
        regions: null
      }, {
        type: types.RECEIVE,
        coords: { latitude: 33.7411707, longitude: -117.7769278 },
        json: {
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
          },
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
      })
    ).toEqual({
      isLocating: false,
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
      },
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
    });
  });
});
