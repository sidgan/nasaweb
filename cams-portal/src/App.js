import React, { Component } from 'react';
import NavigationBar from './components/NavigationBar';
import Popup from './components/Popup';
import Globe from './components/Globe';
import { meteorJson } from './sources/meteors';
import { starJson } from './sources/stars';
import { sunJson } from './sources/sun';

import './App.css';
class App extends Component {

  state = {
    date: "",
    showPopup: false,
    freshLoad: typeof(date) == "string" ? false : true,
    data: [],
    }

  componentDidMount() {
    let newDate = new Date();
    this.setState({
      date: newDate.toDateString()
    });
  }


  togglePopup = () => {
    this.setState({ showPopup: !this.state.showPopup })
  }

  handleDateChange = date => {
    let newDate = date.toDateString();
    this.setState({
      date: newDate
    });
  };

  render() {
    return (
      <div className="App">
        <NavigationBar
          selectedDate={this.state.date}
          onDateChange={this.handleDateChange}
        />

        <button className="switch" onClick={this.togglePopup}>Click!</button>
        <hr />
        {
          this.state.showPopup ?
            <Popup
              text='Legend: Inclusive of web portal directives'
              closePopup={this.togglePopup}
            />
            : null
        }
        <hr />

        <Globe
          date={this.state.date}
          geoMeteorJson={meteorJson}
          geoStarJson={starJson}
          geoSunJson={sunJson}
          size={800}/>
          
        <hr />
      </div>
    )
  }
}


export default App;   