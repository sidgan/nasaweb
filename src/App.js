import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import GlobeOptimized from './components/GlobeOptimized';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import VideoView from './components/VideoView';

import { StorageProvider } from './contexts/storage';
import { NavigationProvider } from './contexts/navigation';
import { NotificationProvider } from './contexts/notification';
import { WorkerProvider } from './contexts/worker';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

import DateFnsUtils from '@date-io/date-fns';
import Responsive from 'react-responsive-decorator';
import Cookies from 'js-cookie';

import './App.css';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showGlobe: true,
      timelineTesting: Cookies.get('timeline_experiment'),
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  toggleDisplay = () => {
    this.setState({
      showGlobe: !this.state.showGlobe,
    });
  };

  renderTimeline = () => {
    if (this.state.timelineTesting && this.state.showGlobe) {
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
            <WorkerProvider>
              <NotificationProvider>
                <StorageProvider>
                  <Switch>
                    <Route path="/video">
                      <NavigationProvider>
                        <div className="globe-container">
                          <div className="main-section">
                            <VideoView />
                          </div>
                        </div>
                      </NavigationProvider>
                    </Route>
                    <Route path="/">
                      <div className="App">
                        <NavigationProvider>
                          <Header />
                          <div className="globe-container">
                            <div className="main-section">
                              <GlobeOptimized />
                            </div>
                            {this.renderTimeline()}
                          </div>
                        </NavigationProvider>
                        <Footer />
                      </div>
                    </Route>
                  </Switch>
                </StorageProvider>
              </NotificationProvider>
            </WorkerProvider>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </Router>
    );
  }
}

export default React.memo(Responsive(App));
