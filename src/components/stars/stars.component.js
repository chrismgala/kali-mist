import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StarsOutline = styled.div`
  display: inline-block;
  position: relative;
  
  :before {
    content: "\\e901 \\e901 \\e901 \\e901 \\e901";
    color: #00CDBE;
  }
`;

const StarsFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: ${props => props.width || 0}%;
  
  :before {
    content: "\\e900 \\e900 \\e900 \\e900 \\e900";
    color: #00CDBE;
  }
`;

const Stars = ({ rating }) => (
  <StarsOutline className="icon-stars-outline">
    <StarsFill className="icon-stars-fill" width={((Math.round(rating * 10) / 10) / 5) * 100}/>
  </StarsOutline>
);

Stars.propTypes = {
  rating: PropTypes.number
};

Stars.defaultProps = {
  rating: 0
};

export default Stars;
