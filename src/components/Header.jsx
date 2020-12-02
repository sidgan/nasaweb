import React, { Component } from 'react';
import Stations from './Stations';
import DatePicker from './DatePicker';
import Grid from '@material-ui/core/Grid';
// import { DatePicker } from 'react-rainbow-components';
import Responsive from 'react-responsive-decorator';
import logo from '../images/logo.svg';

import './style.css';

class Header extends Component {
  state = {
    date: this.props.selectedDate,
  };

  componentDidUpdate() {
    console.log(`Here we are! ${this.state.date}`);
    this.props.onDateChange(this.state.date);
  }

  render() {
    return (
      <div className="flexbox_container">
        <p className="title_item col-lg-8"> 
          <div className="row">
            <a className="logo_item" href="http://cams.seti.org">
              <img src={logo} alt="NASA" width="50" height="30" />
            </a>
            Meteor Shower Portal
          </div>
        </p>
        <div className="search_box col-lg-4 align-right">
          {/* <img
            src="https://img.icons8.com/ios-filled/50/e74c3c/down2.png"
            alt=""
          />
          <br /> */}

          {/* <div
            className="rainbow-align-content_right rainbow-m-vertical_large"
            style={{ maxWidth: 350 }}
          >
            <DatePicker
              minDate={new Date(2018, 10, 1)}
              maxDate={new Date(2020, 10, 8)}
              value={this.state.date}
              onChange={(value) =>
                this.setState({ date: value.toDateString() })
              }
              placeholder="Pick A Date To See Meteors"
              formatStyle="large"
            />
          </div> */}
          <Grid container spacing={2}>
            <Grid item>
              <DatePicker/>
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

export default Responsive(Header);
