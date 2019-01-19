import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Avatar from '../avatar/avatar.component';
import Stars from '../stars/stars.component';

const Card = styled.div`
  @media screen and (min-width: 720px) {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const AvatarWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 20%;
  margin: 0 15px 0 0;
`;

const ContentWrapper = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 70%;
  text-align: left;
`;

const ContentName = styled.h4`
  margin: 15px 0 0 0;
  line-height: 25px;
`;

const DetailsWrapper = styled.div`
  display: block;
  
  .app__listing-card__details-rating,
  .app__listing-card__details-divider,
  .app__listing-card__details-distance {
    display: inline-block;
    margin: 5px 10px 10px 0;
  }
  
  .app__listing-card__details-rating {
    vertical-align: unset;
  }
  
  .app__listing-card__details-divider {
    vertical-align: top;
  }
  
  .app__listing-card__details-distance {
    vertical-align: middle;
    font-size: 14px;
  }
`;

const ListingCard = ({ listing }) => (
  <Card>
    <AvatarWrapper className="app__listing-card__avatar">
      <Avatar img={listing.avatar_image.small_url} />
    </AvatarWrapper>
    <ContentWrapper className="app__listing-card__content">
      <ContentName className="app__listing-card__content-name">
        {listing.name}
      </ContentName>
      <DetailsWrapper className="app__listing-card__details">
        <div className="app__listing-card__details-rating">
          <Stars rating={listing.rating} />
        </div>
        <p className="app__listing-card__details-divider">|</p>
        <p className="app__listing-card__details-distance">
          {Math.round(listing.distance * 10) / 10} mi
        </p>
      </DetailsWrapper>
    </ContentWrapper>
  </Card>
);

ListingCard.propTypes = {
  listing: PropTypes.object
};

ListingCard.defaultProps = {
  listing: {}
};

export default ListingCard;
