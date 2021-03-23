import React, { Component } from 'react';
// import Responsive from 'react-responsive-decorator';

import SpaceMl from '../images/spaceml.png';

class Footer extends Component {
  state = {};

  render() {
    return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fix bugs
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
<<<<<<< HEAD

        <div className="footer_nav">
          <div className="footer-nav-link">About</div>
          <div className="footer-nav-link">Start a network</div>
          <div className="footer-nav-link">CAMS</div>
=======
      <section>
        <div className="footer">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-8 text-left">
                <p className="footer-tab">
                  Built by:
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="http://spaceml.org/"
                  >
                    <img src={SpaceMl} alt={SpaceMl}></img>
                  </a>
                </p>
                <p className="footer-tab">
                  Hosted by:
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.seti.org"
                  >
                    The SETI Institute
                  </a>
                </p>
                <p className="footer-tab">
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

              <div className="col-lg-4 footer_nav text-right">
                <h5>About</h5>
                <h5>Start a network</h5>
                <h5>CAMS</h5>
              </div>
            </div>
          </div>
>>>>>>> small fix
=======

        <div className="footer_nav">
          <div className="footer-nav-link">About</div>
          <div className="footer-nav-link">Start a network</div>
          <div className="footer-nav-link">CAMS</div>
>>>>>>> fix bugs
        </div>
      </div>
    );
  }
}

// export default Responsive(Footer);
export default Footer;
