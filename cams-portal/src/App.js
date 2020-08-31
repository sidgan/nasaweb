import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import NavigationBar from './components/NavigationBar';
import Globe from './components/Globe';
import Button from './components/Button';
import FooterTabs from './components/FooterTabs';
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
                <div className='header'> Legendary</div>
                <div className='content'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
                  omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
                  ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
                  doloribus. Odit, aut.
                </div>
              </div>
            </Popup>
            : null
        }
        <div className='flexbox_container'>
          <div className='col-lg-10'>
            <Globe
              date={this.updateGlobeWithData}
              />
          </div>
          <div className='col-lg-2 m-6 switch'>
            <Button 
              onClick={this.togglePopup}
              className="switch"
            />
          </div>
        </div>
        <FooterTabs />
      </div>
    )
  }
}


export default App;     