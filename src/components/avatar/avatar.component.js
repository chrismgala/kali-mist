import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImgWrapper = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 55px;
  width: 55px;
  border: 1px solid #C6C6C6;
  border-radius: 50%;
`;

const Avatar = ({ img }) => (
  <ImgWrapper className='avatar'>
    <Img alt='listing img' src={img} />
  </ImgWrapper>
 );

Avatar.propTypes = {
  img: PropTypes.string
};

Avatar.defaultProps = {
  img: ''
};

export default Avatar;
