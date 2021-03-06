import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
// import Responsive from 'react-responsive-decorator';
import AboutHelper from './tooltips/AboutTooltip';
import HelpTooltip from './tooltips/HelpTooltip';

import SpaceMl from '../images/spaceml.png';
class Footer extends Component {
  state = {
    showAbout: false,
    showHelper: false,
  };

  render() {
    return (
      <div className="footer">
        <div className="footer-credit">
          <p className="footer-credit-section">
            Built by:
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://spaceml.org/"
            >
              <img src={SpaceMl} alt={SpaceMl}></img>
            </a>
          </p>
          <p className="footer-credit-section">
            Hosted by:
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.seti.org"
            >
              The SETI Institute
            </a>
          </p>
          <p className="footer-credit-section">
            Curator:
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.seti.org/our-scientists/peter-jenniskens"
            >
              Peter Jenniskens
            </a>
          </p>
        </div>

        <div className="footer_nav">
          <div className="footer-nav-link">
            <p
              onClick={() =>
                this.setState({ showAbout: !this.state.showAbout })
              }
            >
              About
            </p>
          </div>
          <div className="footer-nav-link">Start a network</div>
          <div className="footer-nav-link">CAMS</div>
          <div className="footer-nav-link">
            {this.state.showHelper ? (
              <HelpTooltip
                handleClose={() => this.setState({ showHelper: false })}
              />
            ) : null}
            {/* <HtmlTooltip title={<Helper />}> */}
            <Button
              className="guide-1"
              style={{ minHeight: '40px', minWidth: '40px', fontSize: '20px' }}
              variant="contained"
              color="secondary"
              onClick={() =>
                this.setState({ showHelper: !this.state.showHelper })
              }
            >
              <b>?</b>
            </Button>
          </div>
        </div>
        {this.state.showAbout ? (
          <AboutHelper
            handleClose={() => this.setState({ showAbout: false })}
          />
        ) : null}
      </div>
    );
  }
}

export default Footer;
