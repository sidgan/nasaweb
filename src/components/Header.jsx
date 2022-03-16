import React from 'react';
import StationSelect from './Stations';
import ViewToggler from './ViewToggler';
import NavigationBar from './Navigation';

import { useNavigationState } from '../contexts/navigation';

import logo from '../images/logo.svg';

const Header = (props) => {
  const navigationState = useNavigationState();

  return (
    <div className="flexbox_container">
      <div className="title_item">
        <a
          className="logo_item"
          target="_blank"
          rel="noopener noreferrer"
          href="http://cams.seti.org"
        >
          <img src={logo} alt="NASA" width="40px" height="40px" />
        </a>
        Meteor Shower Portal
      </div>
      <div className="header-nav">
        <div className="header-nav-item">
          <StationSelect
            source={navigationState.source}
            changeSource={navigationState.changeSource}
          />
        </div>
        <div className="header-nav-item">
          <ViewToggler
            showGlobe={props.showGlobe}
            toggleDisplay={props.toggleDisplay}
          />
        </div>
      </div>
      <NavigationBar onChange={navigationState.changeDate} />
    </div>
  );
};

export default React.memo(Header);
