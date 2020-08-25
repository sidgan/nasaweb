import React, { Component } from 'react';
import NavigationBar from './components/NavigationBar';
import Popup from './components/Popup';
import Globe from './components/Globe';

import './App.css';
class App extends Component {

  constructor() {
    super();
    this.state = {
      date: "",
      showPopup: false,
    }
  }


  static getDerivedStateFromProps(props, state) {
    let newDate = new Date();
    return {
      date: newDate.toDateString()
    }
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
          date={this.updateGlobeWithData}
          />
          
        <hr />
      </div>
    )
  }
}


export default App;     