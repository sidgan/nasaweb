import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import NavigationBar from './components/NavigationBar';
import GlobeObject from './components/Globe';
import Button from './components/Button';
import FooterTabs from './components/FooterTabs';
// import StyledCheckbox from './components/Checkbox';

import image from './images/CAMSbanner.jpg';
import './App.css';


import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";


class App extends Component {

  constructor() {
    super();
    this.state = {
      date: "",
      status: "Remove",
      showPopup: false,
      showOverlay: true
    };
    this.handleDateChange = this.handleDateChange.bind(this)
  }


  static getDerivedStateFromProps(props, state) {
    let newDate = new Date();
    return {
      date: `${newDate.toDateString()}`
    }
  }

  togglePopup = () => {
    console.log(`Popup -${this.state.showPopup}`)
    this.setState({ showPopup: !this.state.showPopup })
  }

  toggleOverlay = () => {
    this.setState({ showOverlay: !this.state.showOverlay });
    console.log(this.state.showOverlay)
    if (this.state.showOverlay) {
      this.setState({ status: "Add" })
    } else {
      this.setState({ status: "Remove" })
    }
  }

  handleDateChange = date => {
    let newDate = date.toDateString();
    console.log(newDate)
    this.setState({
      date: newDate
    });
  };

  updateGlobeWithData = () => {
    return this.getDateFormat(this.state.date)
  }

  addZ = n => { return n < 10 && n.length === 1 ? '0' + n : '' + n; }
  getMonthFromString = mon => {
      return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
  }
 
  getDateFormat = date => {
      let res = date.split(" ");
      let month = this.getMonthFromString(res[1])
      return `${res[3]}_${this.addZ(String(month))}_${this.addZ(res[2])}`;
  }


  render() {
    console.log(this.state.date)
    return (
      <div className="App">
        <NavigationBar
          selectedDate={this.state.date}
          onDateChange={this.handleDateChange}
        />

        {
          this.state.showPopup ?
            <Popup
            open={this.state.showPopup}
            position='bottom left'
            closeOnDocumentClick
            onClose={this.togglePopup}
            modal
            >
              <div className="modal">
                <p className="close" href='#' onClick={this.togglePopup}>
                  &times;
                </p>
                <div className='header'> CAMS Portal Instructions</div>
                <div className='content'>
                  <b>Explanation:</b> The celestial sphere shows stars in <span style={{color: 'black'}}>black</span> and meteors in colors (showers: <span style={{color: 'red'}}>red = fast</span>, <span style={{color: 'blue'}}>blue = slow</span>) or white (non-showers). Each dot is the direction from which a meteor approached (called the "radiant"), displayed in sun-centered ecliptic coordinates. Showers are assigned according to the CAMS Shower Lookup Table (10 Mb) described in this publication. New showers will show up as groupings of white dots.
                </div>
                <div className='content'>
                  <b>Site usage:</b> Requires HTML5 compatable browser. Click the text box under the <span style={{color: 'red'}}>red pointer</span>. From pop-up calendar displayed, pick a past date to see available meteor data from one of the meteor shower surveillance networks. Rotate sphere with cursor. Hover over point to get the IAU stream number. Click to bring up a new window to see that shower in space.
                </div>
              </div>
            </Popup>
            : null
        }
        <div className='flexbox_container'>
          <div className='col-lg-12'>
            <img src={image} className="cams-logo" alt="cams"></img>
            {/* <Globe
              date={this.updateGlobeWithData}
              /> */}
            <GlobeObject
              />
    
            {/* <Globe
              globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
              width="800"
              height="800"/> */}
          </div>
          <div className='m-6'>

              <div className="guide-1">
                <Button onClick={this.togglePopup}>Open Guide</Button>
              </div>
              {/* <div className="overlay">
                <Button onClick={this.toggleOverlay}>{this.state.status} Overlay</Button>
              </div> */}
          </div>
        </div>
        <FooterTabs />
      </div>
    )
  }
}
  



export default App;      