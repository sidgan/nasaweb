import React, { Component } from 'react';
import MainSection from './components/Globe';
import GroupedButton from './components/GroupedButton';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import NavigtaionContext, { getNewDate } from './contexts/navigation';
import TimelineContext, { getTodaysDate } from './contexts/timeline';

import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

import Responsive from 'react-responsive-decorator';

import './App.css';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.changeStartDate = (newDate) => {
      this.setState({
        startDate: newDate,
      });
    }

    this.changeEndDate = (newDate) => {
      this.setState({
        endDate: newDate,
      });
    }

    this.state = {
      showGlobe: true,
      startDate: getTodaysDate(),
      endDate: getTodaysDate(),
      changeStartDate: this.changeStartDate,
      changeEndDate: this.changeEndDate,
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

    const timelineData = {
      startDate: this.state.startDate, 
      endDate: this.state.endDate,
      changeStartDate: this.state.changeStartDate,
      changeEndDate: this.state.changeEndDate,
    }

    return (
      <MuiThemeProvider theme={theme}>
        <NavigtaionContext.Provider
          value={{ source: 'ALL', date: getNewDate() }}
        >
          <TimelineContext.Provider
            value= {timelineData}
          >
            <div className="App">
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
          </TimelineContext.Provider>
        </NavigtaionContext.Provider>
      </MuiThemeProvider>
    );
  }
}

export default React.memo(Responsive(App));
