import React, { Component } from 'react';
import GlobeObject from './components/Globe';
// import Button from './components/Button';
import Footer from './components/Footer';
import Responsive from 'react-responsive-decorator';

// import image from './images/CAMSbanner.jpg';
import './App.css';
// import Guide from './components/Guide';

class App extends Component {
  constructor() {
    super();
    this.state = {
      date: '',
      status: 'Remove',
      showGuide: false,
      showOverlay: true,
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.updateGlobeWithDate = this.updateGlobeWithDate.bind(this);
  }

  // toggleGuide = () => {
  //   this.setState({ showGuide: !this.state.showGuide });
  // };

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
      <div className="App">
{/* 
        {this.state.showGuide ? (
          <Guide
            status={this.state.showGuide}
            togglePopup={this.toggleGuide}
            />
        ) : null} */}
        <div className="globe-container">
          <div className="col-lg-12 col-sm-12">
            {/* <img src={image} className="cams-logo" alt="cams"></img> */}

            <GlobeObject
              selectedDate={this.state.date}
              onDateChange={this.handleDateChange}
              date={this.updateGlobeWithDate()}
              // status={this.state.showOverlay}
              />
          </div>
          {/* <div className="m-6">
            <div className="guide-1">
              <Button onClick={this.toggleGuide}>Open Guide</Button>
            </div>
          </div> */}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Responsive(App);
 