import React, { Component } from 'react';
// import Stations from './Stations';
import NativeSelects from './Stations';
import NavigationBar from './Navigation';
import Grid from '@material-ui/core/Grid';

import logo from '../images/logo.svg';
import './style.css';
// import SimpleSelect from './NewStations';

class Header extends Component {

  render() {
    return (
      <div className="flexbox_container">
        <p className="title_item col-lg-9"> 
          <div className="row">
            <a className="logo_item" target="_blank" rel="noopener noreferrer" href="http://cams.seti.org">
              <img src={logo} alt="NASA" width="60" height="40" />
            </a>
            Meteor Shower Portal
          </div>
        </p>
        <div className="search_box col-lg-3 text-right">
          <Grid container spacing={2}>
            <Grid item>
              <NavigationBar
                onChange={this.props.onDateChange}
              />
            </Grid>

            <Grid item>
              {/* <Stations
                onChange={this.props.onSourceChange}
              /> */}
              <NativeSelects
                onChange={this.props.onSourceChange}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default React.memo(Header);
