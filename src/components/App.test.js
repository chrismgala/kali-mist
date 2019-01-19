import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { App } from './App';

Enzyme.configure({ adapter: new Adapter() });

const location = {
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
};
const regions = {
  dispensary: {
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
    },
    listings: [{
      id: 54554,
      wmid: 230908716,
      name: 'H3 Holistic Heart Healing',
      slug: 'holistic-heart-healing',
      type: 'dispensary',
      city: 'Costa Mesa',
      state: 'CA',
      avatar_image: {
        small_url: 'https://images.weedmaps.com/dispensaries/000/054/554/avatar/square_fill/1512709232-HOLISTIC_ONESS.jpg'
      },
      rating: 4.96336336336336,
      distance: 8.38597307217022,
      static_map_url: 'https://staticmap.weedmaps.com/static_map/13/33.657476/-117.901704/402/147/map.png',
      feature_order: 7,
      license_type: 'medical',
      package_level: 'listing_plus',
      region_id: 123,
      online_ordering: {
        enabled_for_pickup: false,
        enabled_for_delivery: false
      },
      retailer_services: [
        'storefront'
      ]
    }],
  },
  delivery: {
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
    },
    listings: [{
      id: 8153,
      wmid: 465540215,
      name: 'KUSHAGRAM',
      slug: 'kushagram',
      type: 'delivery',
      city: 'Irvine',
      state: 'CA',
      avatar_image: {
        small_url: 'https://images.weedmaps.com/deliveries/000/008/153/avatar/square_fill/1510580904-image.png'
      },
      rating: 4.8,
      distance: 3.810240679098693,
      static_map_url: 'https://staticmap.weedmaps.com/static_map/13/33.682873/-117.819615/402/147/map.png',
      feature_order: 1,
      license_type: 'medical',
      package_level: 'listing_plus',
      region_id: 166,
      online_ordering: {
        enabled_for_pickup: false,
        enabled_for_delivery: true
      },
      retailer_services: [
        'delivery'
      ]
    }],
  },
  doctor: {
    id: 121,
    name: 'Lake Forest',
    slug: 'south-oc',
    region_path: 'united-states/california/south-oc',
    latitude: 33.64417266845703,
    longitude: -117.6851272583008,
    top_left: {
      latitude: 33.85132,
      longitude: -117.721841
    },
    bottom_right: {
      latitude: 33.606985,
      longitude: -117.531023
    },
    listings: [{
      id: 15156,
      wmid: 463055189,
      name: 'OnlineMedicalCard.com (100% Online)',
      slug: 'online-medical-cards-113',
      type: 'doctor',
      city: 'Irvine',
      state: 'CA',
      avatar_image: {
        small_url: 'https://images.weedmaps.com/doctors/000/015/156/avatar/square_fill/1510583519-1507850144-_DC6A371C8295025E76C268BD0FBC648C6F1EDBE0458F8E1642_pimgpsh_fullsize_distr.jpg'
      },
      rating: 4.98666666666667,
      distance: 4.094845143719754,
      static_map_url: 'https://staticmap.weedmaps.com/static_map/13/33.719563/-117.788293/402/147/map.png',
      feature_order: 2,
      license_type: 'medical',
      package_level: 'listing_plus',
      region_id: 121,
      online_ordering: {
        enabled_for_pickup: false,
        enabled_for_delivery: false
      },
      retailer_services: [
        'doctor'
      ]
    }]
  }
};

function setup() {
  const enzymeWrapper = shallow(<App location={location} regions={regions} />);

  return {
    enzymeWrapper
  };
}

describe('<App/>', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup();

    const buttonProps = enzymeWrapper.find('Button').props();
    expect(buttonProps.text).toBe('Locate Me');

    const locationHeaderProps = enzymeWrapper.find('LocationHeader').props();
    expect(locationHeaderProps.location.name).toBe('Irvine, CA');

    const listingCardsProps = enzymeWrapper.find('ListingCards').first().props();
    expect(listingCardsProps.listings[0].rating).toBe(4.8);
  });
});
