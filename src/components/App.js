import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import styled, { createGlobalStyle } from 'styled-components';
import { locate } from '../actions';
import logo from '../assets/logo.png';
import Button from './button/button.component';
import ListingCards from './listing_cards/listing_cards.component';
import LocationHeader from './location_header/location_header.component';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'wm-icons';
    src:  url('/fonts/wm-icons.eot?5cqp75');
    src:  url('/fonts/wm-icons.eot?5cqp75#iefix') format('embedded-opentype'),
      url('/fonts/wm-icons.ttf?5cqp75') format('truetype'),
      url('/fonts/wm-icons.woff?5cqp75') format('woff'),
      url('/fonts/wm-icons.svg?5cqp75#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  
  [class^="icon-"], [class*=" icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'wm-icons' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    padding: 0;
    min-width: 320px;
    font-family: sans-serif;
  }
`;

const AppWrapper = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const AppHeader = styled.header`
  height: 70px;
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  color: #fff;
`;

const AppHeaderLogo = styled.img`
  width: 110px;
  height: 25px;
`;

const AppLoading = styled.p`
  margin: 20px 0;
  font-size: 16px;
  color: #333;
`;

const AppContent = styled.main`
  width: 90%;
  margin: 0 auto;
`;

const AppRegionsContentLabel = styled.h3`
  height: 40px;
  width: 100%;
  margin: 10px;
  text-align: left;
  line-height: 40px;
  
  @media screen and (min-width: 720px) {
    margin: 15px 10px 10px 10px;
  }
`;

const regionTypes = ['delivery', 'dispensary', 'doctor'];
const regionLabels = {
  delivery: 'Deliveries',
  dispensary: 'Dispensaries',
  doctor: 'Doctors'
};

export class App extends Component {
  constructor() {
    super();
    this.state = {
      clientLocating: false
    };

    this.locateMeClick = this.locateMe.bind(this);
  }

  componentDidMount() {
    this.locateMe();
  }

  locateMe() {
    const { dispatch } = this.props;
    if (navigator.geolocation) {
      this.setState({ ...this.state, clientLocating: true });
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(locate(position.coords));
      });
    }
  }

  render() {
    const { isLocating, location, regions } = this.props;
    const { clientLocating } = this.state;

    const getLabel = (listings, label) => {
      if (get(listings, 'listings').length) {
        return (
          <AppRegionsContentLabel key={label} className="app__regions__content-label">
            <strong> {label} </strong>
          </AppRegionsContentLabel>
        );
      }
      return <div/>;
    };

    return (
      <AppWrapper className="app">
        <AppHeader className="app__header">
          <AppHeaderLogo src={logo} className="app__header__logo" alt="weedmaps logo" width="300" height="70" />
          <Button text={'Locate Me'} onClick={this.locateMeClick} />
        </AppHeader>
        <AppContent className="app_content">
          { (clientLocating || isLocating) && !location &&
            <AppLoading className="app__loading">Locating...</AppLoading>
          }
          { !isLocating && location &&
            <LocationHeader location={location}/>
          }
          { !isLocating && regions &&
            <div className="app__regions">
              { regionTypes.map(regionType => (
                <div key={regionType} className="app__regions__content">
                  {getLabel(regions[regionType], regionLabels[regionType])}
                  <ListingCards listings={get(regions[regionType], 'listings')}/>
                </div>
              ))}
            </div>
          }
        </AppContent>
        <GlobalStyle />
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => state.location;

App.propTypes = {
  isLocating: PropTypes.bool.isRequired,
  location: PropTypes.object,
  regions: PropTypes.object,
  dispatch: PropTypes.any
};

App.defaultProps = {
  isLocating: false,
  location: {},
  regions: {}
};

export default connect(mapStateToProps)(App);
