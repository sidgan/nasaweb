import React, { Component } from 'react';
// import Responsive from 'react-responsive-decorator';

class Footer extends Component {
  state = {};

  render() {
    return (
      <div className="footer">
        <div className="footer-credit">
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
              href="mailto:petrus.m.jenniskens@nasa.gov"
            >
              Peter Jenniskens
            </a>
          </p>
          <p className="footer-credit-section">
            Responsible NASA Official:
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="http://cams.seti.org"
            >
              Lindley Johnson
            </a>
          </p>
        </div>

        <div className="footer_nav">
          <div className="footer-nav-link">About</div>
          <div className="footer-nav-link">Start a network</div>
          <div className="footer-nav-link">CAMS</div>
        </div>
      </div>
    );
  }
}

// export default Responsive(Footer);
export default Footer;
