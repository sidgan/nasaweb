import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Popup from './components/Popup';

class App extends Component {
  state = {
    showPopup: false
  }

  togglePopup = () => {
    console.log("works", this.state.showPopup);
    this.setState({ showPopup: !this.state.showPopup })
  }
  
  render () {

    return (
      <div className="App">
        <NavigationBar />

        <button className="switch" onClick={this.togglePopup}>Click!</button>

        {
          this.state.showPopup ?
          <Popup
            text='Legend: Inclusive of web portal directives'
            closePopup={this.togglePopup}
          />
          : null
        }
      </div>
    );
  }
}

export default App;

   