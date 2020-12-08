import React, { Component } from 'react';
import GlobeObject from './components/Globe';
import GroupedButton from './components/GroupedButton';
import Footer from './components/Footer';
import ReactVirtualizedTable from './components/Table';

import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

import Responsive from 'react-responsive-decorator';

import 'fontsource-roboto';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showGlobe: false,
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  toggleDisplay = () => {
      this.setState({
          showGlobe: !this.state.showGlobe
      });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <div className="globe-container">
            <div className="col-lg-12 col-sm-12">

              {
                this.state.showGlobe ?

                <ReactVirtualizedTable />

                :

                <GlobeObject/>

              }  

            </div>
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
      </ThemeProvider>
    );
  }
}

export default React.memo(Responsive(App));
