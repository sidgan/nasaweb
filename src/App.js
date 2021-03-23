import React, { Component } from 'react';
import Header from './components/Header';
import Globe from './components/Globe';
import GroupedButton from './components/GroupedButton';
import Timeline from './components/Timeline';
import Footer from './components/Footer';

import { StorageProvider } from './contexts/storage';
import { NavigationProvider } from './contexts/navigation';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

import DateFnsUtils from '@date-io/date-fns';
import Responsive from 'react-responsive-decorator';

import './App.css';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showGlobe: true,
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  toggleDisplay = () => {
    this.setState({
      showGlobe: !this.state.showGlobe,
    });
  };

  renderTimeline = () => {
    if (this.state.showGlobe) {
      return (
        <div className="timeline-container">
          <Timeline />
        </div>
      );
    }
  };

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <StorageProvider>
              <NavigationProvider>
                <Header />
                <div className="globe-container">
                  <div className="main-section">
                    <Globe showGlobe={this.state.showGlobe} />
                  </div>
                  {/* {this.renderTimeline()} */}
                </div>
                <div className="guide-1">
                  <GroupedButton
                    showGlobe={this.state.showGlobe}
                    toggleDisplay={this.toggleDisplay}
                  />
                </div>
              </NavigationProvider>
            </StorageProvider>
            <Footer />
          </div>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default React.memo(Responsive(App));
