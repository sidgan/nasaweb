import React, { Component } from 'react';
import Stations from './Stations';
import NavigationBar from './Navigation';
import Grid from '@material-ui/core/Grid';
// import { DatePicker } from 'react-rainbow-components';
import Responsive from 'react-responsive-decorator';
import logo from '../images/logo.svg';

import './style.css';

class Header extends Component {

  render() {
    return (
      <div className="flexbox_container">
        <p className="title_item col-lg-8"> 
          <div className="row">
            <a className="logo_item" href="https://cams.seti.org" target="_blank">
              <img src={logo} alt="NASA" width="60" height="40" />
            </a>
            Meteor Shower Portal
          </div>
        </p>
        <div className="search_box col-lg-4 text-right">
          <Grid container spacing={2}>
            <Grid item>
              <NavigationBar
                selectedDate={this.props.selectedDate}
                onDateChange={this.props.onDateChange}
              />
            </Grid>

            <Grid item>
              <Stations />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default React.memo(Responsive(Header));
