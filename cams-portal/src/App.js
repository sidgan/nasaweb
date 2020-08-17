import React, { Component } from 'react';
import NavigationBar from './components/NavigationBar';
import Popup from './components/Popup';
import Globe from './components/Globe';
import { Data } from './components/test'

import './App.css';
class App extends Component {

  state = {
    showPopup: false,
    data: []
  }

  togglePopup = () => {
    console.log("works", this.state.showPopup);
    this.setState({ showPopup: !this.state.showPopup })
  }

  render() {
    return (
      <div className="App">
        <NavigationBar />

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
        <Globe geoJson={Data} size={400} />
        <hr />
      </div>
    )
  }
}


export default App;