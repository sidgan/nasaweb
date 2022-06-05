import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Globe from './components/Globe';
import GlobeOptimized from './components/GlobeOptimized';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import VideoView from './components/VideoView';

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
      <Router>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiThemeProvider theme={theme}>
            <StorageProvider>
              <NavigationProvider>
                <Switch>
                  <Route path="/video">
                    <div className="globe-container">
                      <div className="main-section">
                        <VideoView />
                      </div>
                    </div>
                  </Route>
                  <Route path="/">
                    <div className="App">
                      <Header
                        showGlobe={this.state.showGlobe}
                        toggleDisplay={this.toggleDisplay}
                      />
                      <div className="globe-container">
                        <div className="main-section">
                          <GlobeOptimized />
                        </div>
                        {this.renderTimeline()}
                      </div>
                      <Footer />
                    </div>
                  </Route>
                </Switch>
              </NavigationProvider>
            </StorageProvider>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </Router>
    );
  }
}

export default React.memo(Responsive(App));
