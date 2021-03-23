import React from 'react';
import StationSelect from './Stations';
import DatePicker from './DatePicker';

import { useNavigationState } from '../contexts/navigation';

import logo from '../images/logo.svg';

const Header = () => {
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
          <img src={logo} alt="NASA" />
        </a>
        Meteor Shower Portal
      </div>
      <div className="search_box">
        <DatePicker
          date={navigationState.date}
          changeDate={navigationState.changeDate}
          showArrows={true}
        />
        <StationSelect
          source={navigationState.source}
          changeSource={navigationState.changeSource}
        />
      </div>
    </div>
  );
};

export default React.memo(Header);
