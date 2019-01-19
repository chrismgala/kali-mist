import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AppLocationHeader = styled.div`
  height: 100px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  
  h2,
  p {
    margin: 0;
    padding: 0;
  }
`;

const LocationHeader = ({ location }) => (
  <AppLocationHeader className="app__location-header">
    <h2 className="app__location-header__name">{location.name}</h2>
    <p>{location.quote}</p>
  </AppLocationHeader>
 );

LocationHeader.propTypes = {
  location: PropTypes.object
};

LocationHeader.defaultProps = {
  location: {}
};

export default LocationHeader;
