import React, { Component } from 'react';
import GlobeObject from './components/Globe';
import GroupedButton from './components/GroupedButton';
import Footer from './components/Footer';

import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

import Responsive from 'react-responsive-decorator';

import 'fontsource-roboto';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      date: '',
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.updateGlobeWithDate = this.updateGlobeWithDate.bind(this);
  }

  handleDateChange = (d) => {
    const newDate = d;
    console.log(newDate, this.state.date);
    if (newDate === this.state.date) {
      console.log('Updated');
    } else {
      this.setState({
        date: newDate,
      });
    }
  };

  updateGlobeWithDate = () => {
    const { date } = this.state;

    if (date === '') {
      let formatDate = this.getDateFormat(`${new Date()}`);
      return formatDate;
    } else {
      let formatDate = this.getDateFormat(this.state.date);
      return formatDate;
    }
  };

  addZ = (n) => {
    return n < 10 && n.length === 1 ? '0' + n : '' + n;
  };
  getMonthFromString = (mon) => {
    return new Date(Date.parse(mon + ' 1, 2012')).getMonth() + 1;
  };

  getDateFormat = (date) => {
    let res = date.split(' ');
    let month = this.getMonthFromString(res[1]);
    return `${res[3]}_${this.addZ(String(month))}_${this.addZ(res[2])}`;
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <div className="globe-container">
            <div className="col-lg-12 col-sm-12">
              <GlobeObject
                selectedDate={this.state.date}
                onDateChange={this.handleDateChange}
                date={this.updateGlobeWithDate()}
              />
            </div>
            <div className="m-6">
              <div className="guide-1">
                <GroupedButton />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

export default Responsive(App);
