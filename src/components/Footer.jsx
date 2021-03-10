import React, { Component } from 'react';
import Responsive from 'react-responsive-decorator';

import SpaceMl from '../images/spaceml.png';

class Footer extends Component {
  state = {};

  render() {
    return (
      <section>
        <div className="footer">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-10 text-left">
                <p className="footer-tab">
                  Built by:
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.seti.org"
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
                    href="mailto:petrus.m.jenniskens@nasa.gov"
                  >
                    Peter Jenniskens
                  </a>
                </p>
              </div>

              <div className="col-md-2 footer_nav text-right">
                <h5>About</h5>
                <h5>Start a network</h5>
                <h5>CAMS</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Responsive(Footer);
