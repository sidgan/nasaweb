import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import StationSelect from './Stations';
import DatePicker from './DatePicker';

import NavigationContext from '../contexts/navigation';

import logo from '../images/logo.svg';

class Header extends Component {
  render() {
    return (
      <div className="flexbox_container">
        <div className="title_item col-lg-9">
          <div className="row">
            <a
              className="logo_item"
              target="_blank"
              rel="noopener noreferrer"
              href="http://cams.seti.org"
            >
              <img src={logo} alt="NASA" width="36.7" height="30" />
            </a>
            Meteor Shower Portal
          </div>
        </div>
        <div className="search_box col-lg-3 text-right">
          <NavigationContext.Consumer>
            {(navigationState) => (
              <Grid container spacing={2}>
                <Grid item>
                  <DatePicker
                    date={navigationState.date}
                    changeDate={navigationState.changeNavDate}
                    showArrows={true}
                  />
                </Grid>

                <Grid item>
                  <StationSelect 
                    source={navigationState.source}
                    changeSource={navigationState.changeSource}
                  />
                </Grid>
              </Grid>
            )}
          </NavigationContext.Consumer>
        </div>
      </div>
    );
  }
}

Header.contextType = NavigationContext;

export default React.memo(Header);
