import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListingCard from '../listing_card/listing_card.component';

const ListingCardWrapper = styled.div`
  margin: 10px 5px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  
  @media screen and (min-width: 720px) {
    display: inline-block;
    vertical-align: top;
    height: 100px;
    width: 45%;
  }
  
  @media screen and (min-width: 1280px) {
    width: 30%;
  }
`;

const ListingCards = ({ listings }) => (
  <div>
    {listings.map(listing => (
      <ListingCardWrapper key={listing.id} className='app__listing-card-wrapper'>
        <ListingCard listing={listing} />
      </ListingCardWrapper>
    ))}
  </div>
);

ListingCards.propTypes = {
  listings: PropTypes.array
};

ListingCards.defaultProps = {
  listings: []
};

export default ListingCards;
