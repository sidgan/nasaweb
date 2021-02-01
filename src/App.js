import React, { Component } from 'react';
import Header from './components/Header';
import MainSection from './components/Globe';
import GroupedButton from './components/GroupedButton';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import StorageContext from './contexts/storage';
import NavigationContext, { getNewDate } from './contexts/navigation';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

import Responsive from 'react-responsive-decorator';

import './App.css';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.changeNavDate = (date) => {
      this.setState({
        navDate: date,
      });
    };

    this.changeSource = (source) => {
      this.setState({
        source: source,
      });
    }

    this.state = {
      showGlobe: true,
      cachedData: new Map(),
      navDate: getNewDate(),
      source: 'ALL',
      changeNavDate: this.changeNavDate,
      changeSource: this.changeSource,
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
        <Timeline/>
      </div>
      )
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <StorageContext.Provider 
          value={this.state.cachedData}
        >
          <NavigationContext.Provider
            value={{ 
              source: this.state.source, 
              date: this.state.navDate,
              changeSource: this.state.changeSource,
              changeNavDate: this.state.changeNavDate,
            }}
          >
            <div className="App">
              <Header />
              <div className="globe-container">
                <div className="col-lg-12 col-sm-12 main-section">
                  <MainSection showGlobe={this.state.showGlobe} />
                </div>
                {this.renderTimeline()}
                <div className="m-6">
                  <div className="guide-1">
                    <GroupedButton
                      showGlobe={this.state.showGlobe}
                      toggleDisplay={this.toggleDisplay}
                    />
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </NavigationContext.Provider>
        </StorageContext.Provider>
      </MuiThemeProvider>
    );
  }
}

export default React.memo(Responsive(App));
